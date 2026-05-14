VUZALKA - Rediseno UI/UX

Archivos principales:
- index.html       -> nuevo Home estilo editorial/minimalista
- perfumes.html    -> catalogo limpio con filtros
- producto.html    -> detalle de producto con galeria y CTA sticky
- nosotros.html    -> pagina institucional simplificada
- contacto.html    -> pagina de contacto simplificada
- styles.css       -> estilos globales del rediseno
- app.js           -> logica compartida, Firebase + interacciones

Implementacion:
1. Reemplaza en la raiz del sitio estos archivos nuevos.
2. Conserva tu carpeta assets tal como ya existe.
3. Conserva admin.html, porque el rediseno sigue leyendo la misma coleccion de Firestore: products.
4. El Home sigue leyendo siteContent/home para heroTitle, heroDescription y heroImage cuando existan.
5. La ficha de producto se abre con producto.html?id=DOCUMENT_ID.

Notas:
- Si Firestore no responde o no hay productos publicados, el sitio muestra un catalogo de respaldo con datos demo.
- No necesitas librerias nuevas. Solo se usan Google Fonts y Firebase por CDN.
