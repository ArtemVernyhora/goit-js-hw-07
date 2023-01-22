import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryEl = document.querySelector(".gallery");

galleryEl.innerHTML = galleryItems
  .map(({ preview, original, description }) => {
    return `
    <div class="gallery__item">
                <a class="gallery__link" href="${original}">
                    <img
                        class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                    />
                </a>
            </div>`;
  })
  .join("");

galleryEl.addEventListener("click", openModalGallery);

function openModalGallery(e) {
  e.preventDefault();
  if (e.target.nodeName !== "IMG") return;

  const instance = basicLightbox.create(
    `<img src="${e.target.dataset.source}" width="1280" height="auto">`,
    {
      onShow: () => window.addEventListener("keydown", onEsc),
      onClose: () => window.removeEventListener("keydown", onEsc),
    }
  );

  function onEsc(e) {
    if (e.code === "Escape") {
      instance.close();
    }
  }
  instance.show();
}
