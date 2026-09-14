import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // All delivery calls are blocked unless a test explicitly supplies a mock.
  await page.route('https://api.emailjs.com/**', route => route.abort());
});

test('contenido actualizado, recursos y disposición responsive', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page).toHaveTitle('Víctor González Carro — Frontend Engineer');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('perspectiva.');
  await expect(page.locator('.project-card')).toHaveCount(5);
  await expect(page.locator('.project-card [role="img"]')).toHaveCount(5);
  await expect(page.locator('.timeline')).toContainText('REDEIA');
  await expect(page.locator('.timeline')).toContainText('Nov 2025 — Mar 2026');
  await expect(page.locator('.education')).toContainText('En curso');
  const ids = await page.locator('[id]').evaluateAll(elements => elements.map(element => element.id));
  expect(new Set(ids).size).toBe(ids.length);
  const pdf = await page.request.get('/CV_Victor_Gonzalez_Carro.pdf');
  expect(pdf.status()).toBe(200);
  expect((await pdf.body()).subarray(0, 5).toString()).toBe('%PDF-');
  await page.locator('#contacto').scrollIntoViewIfNeeded();
  await expect(page.getByRole('button', { name: 'Enviar mensaje', exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test('filtra proyectos y abre detalles con cierre y restauración de foco', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Personal', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(1);
  const opener = page.getByRole('button', { name: 'Ver proyecto TopClubs', exact: true });
  await opener.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('dialog')).toContainText('Mi contribución');
  await expect(page.getByRole('button', { name: 'Cerrar proyecto' })).toBeFocused();
  await expect(page.getByRole('dialog').getByRole('img', { name: /TopClubs/ })).toBeVisible();
  await expect(page.getByRole('dialog').getByRole('link', { name: 'Visitar TopClubs' })).toHaveAttribute('href', 'https://topclubs.es/');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(opener).toBeFocused();
  await page.getByRole('button', { name: 'Profesionales', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(4);
  await page.getByRole('button', { name: 'Ver proyecto ENAIRE', exact: true }).click();
  await expect(page.getByRole('dialog').getByRole('link', { name: 'Conocer ENAIRE' })).toHaveAttribute('href', 'https://www.enaire.es/home');
  await page.getByRole('button', { name: 'Cerrar proyecto' }).click();
  await page.getByRole('button', { name: 'Ver proyecto REDEIA', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText('Oracle');
  await expect(page.getByRole('dialog').getByRole('link', { name: 'Conocer REDEIA' })).toHaveAttribute('href', 'https://www.redeia.com/es');
  await page.getByRole('button', { name: 'Cerrar proyecto' }).click();
  await page.getByRole('button', { name: /Todos/ }).click();
  await expect(page.locator('.project-card')).toHaveCount(5);
});

test('navegación accesible y trayectoria desplegable', async ({ page, isMobile }) => {
  await page.goto('/');
  if (isMobile) {
    await page.getByRole('button', { name: 'Abrir menú' }).click();
    await expect(page.getByRole('navigation')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('navigation')).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Abrir menú' })).toBeFocused();
    await page.getByRole('button', { name: 'Abrir menú' }).click();
  }
  await page.getByRole('navigation').getByRole('link', { name: 'Experiencia', exact: true }).click();
  await expect(page).toHaveURL(/#experiencia$/);
  if (isMobile) await expect(page.getByRole('navigation')).not.toBeVisible();
  const ayesa = page.locator('.experience-item').filter({ hasText: 'Ayesa' });
  await ayesa.locator('summary').click();
  await expect(ayesa.locator('.job-detail')).toBeVisible();
  await ayesa.locator('summary').click();
  await expect(ayesa.locator('.job-detail')).not.toBeVisible();
});

test('formulario valida, mantiene datos en error y confirma envío simulado', async ({ page }) => {
  await page.goto('/');
  const submit = page.getByRole('button', { name: 'Enviar mensaje', exact: true });
  await submit.click();
  await expect(page.getByLabel('Tu nombre', { exact: true })).toBeFocused();
  await expect(page.locator('[aria-invalid="true"]')).toHaveCount(3);
  await page.getByLabel('Tu nombre', { exact: true }).fill(' Persona de prueba ');
  await page.getByLabel('Tu email', { exact: true }).fill('persona@example.com');
  await page.getByLabel('¿Qué tienes en mente?', { exact: true }).fill('Un proyecto de prueba que no se envía de verdad.');
  await page.route('https://api.emailjs.com/**', route => route.fulfill({ status: 500, body: 'TEST_PROVIDER_FAILURE' }));
  await submit.click();
  await expect(page.getByRole('status')).toContainText('No se ha podido enviar');
  await expect(page.getByLabel('Tu email', { exact: true })).toHaveValue('persona@example.com');
  await expect(page.getByRole('status')).not.toContainText('TEST_PROVIDER_FAILURE');
  let payload: { template_params?: { to_email: string; reply_to: string; from_name: string } } = {};
  await page.route('https://api.emailjs.com/**', async route => {
    payload = route.request().postDataJSON();
    await new Promise(resolve => setTimeout(resolve, 150));
    await route.fulfill({ status: 200, body: 'OK' });
  });
  await submit.click();
  await expect(page.getByRole('status')).toContainText('Mensaje enviado.');
  expect(payload.template_params?.to_email).toBe('victor.glez.0422@gmail.com');
  expect(payload.template_params?.reply_to).toBe('persona@example.com');
  expect(payload.template_params?.from_name).toBe('Persona de prueba');
  await expect(page.getByLabel('Tu email', { exact: true })).toHaveValue('');
});

test('la animación se pausa y respeta la preferencia de movimiento reducido', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hero-canvas canvas')).toBeVisible();
  await page.getByRole('button', { name: 'Pausar animación' }).click();
  await expect(page.getByRole('button', { name: 'Reanudar animación' })).toHaveAttribute('aria-pressed', 'true');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.getByRole('button', { name: /animación/ })).toHaveCount(0);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  expect(await page.locator('html').evaluate(element => getComputedStyle(element).scrollBehavior)).toBe('auto');
});

test('WebGL no disponible conserva el contenido y muestra una alternativa visual', async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (...args: Parameters<typeof original>) {
      if (String(args[0]).includes('webgl')) return null;
      return original.apply(this, args);
    } as typeof original;
  });
  await page.goto('/');
  await expect(page.locator('.scene-failed .scene-fallback')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('link', { name: 'Explora mi trabajo' }).click();
  await expect(page).toHaveURL(/#proyectos$/);
});
