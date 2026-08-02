(function () {
  var selector = 'main img';
  var ignoredSelector = '.project-carousel img';
  var dialog, dialogImage, captionTitle, captionDescription, captionNote, closeButton, lastTrigger;

  function isSensitive(image) {
    return !!image.closest('.is-blurred') || /(blur|redacted)/i.test(image.currentSrc || image.src) || /\(민감 정보 블러 처리\)/.test(image.alt || '');
  }

  function getImageTitle(image) {
    return (image.alt || '확대 이미지').replace(/^세부 내용이 블러 처리된\s*/, '').replace(/\s*\(민감 정보 블러 처리\)/g, '');
  }

  function getImageDescription(image) {
    var article = image.closest('article');
    var description = article && article.querySelector('p');
    return description ? description.textContent.trim().replace(/\s*\(민감 정보 블러 처리\)/g, '') : '';
  }

  function close() {
    if (!dialog || !dialog.classList.contains('is-open')) return;
    dialog.classList.remove('is-open');
    dialog.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('image-lightbox-open');
    dialogImage.removeAttribute('src');
    if (lastTrigger) lastTrigger.focus();
  }

  function open(image) {
    var sensitive = isSensitive(image);
    lastTrigger = image;
    dialogImage.src = image.currentSrc || image.src;
    dialogImage.alt = getImageTitle(image);
    dialogImage.style.filter = sensitive ? getComputedStyle(image).filter : '';
    captionTitle.textContent = getImageTitle(image);
    captionDescription.textContent = getImageDescription(image);
    captionDescription.hidden = !captionDescription.textContent;
    captionNote.textContent = sensitive ? '(민감 정보 블러 처리)' : '';
    captionNote.hidden = !sensitive;
    dialog.classList.add('is-open');
    dialog.setAttribute('aria-hidden', 'false');
    document.body.classList.add('image-lightbox-open');
    closeButton.focus();
  }

  function makeDialog() {
    var styles = document.createElement('style');
    styles.textContent = '.image-zoomable{cursor:zoom-in}.image-zoomable:focus-visible{outline:3px solid rgba(34,111,209,.45);outline-offset:4px}.image-lightbox-open{overflow:hidden}.image-lightbox{position:fixed;z-index:1000;inset:0;display:none;place-items:center;padding:32px}.image-lightbox.is-open{display:grid}.image-lightbox__backdrop{position:absolute;inset:0;background:rgba(8,11,15,.84)}.image-lightbox__content{position:relative;z-index:1;width:min(1120px,100%);display:grid;justify-items:center;padding-top:52px}.image-lightbox__media{width:100%;height:min(70vh,640px);display:flex;align-items:center;justify-content:center;border-radius:8px;background:rgba(255,255,255,.04)}.image-lightbox__image{width:100%;height:100%;object-fit:contain;border-radius:8px;box-shadow:0 24px 72px rgba(0,0,0,.45)}.image-lightbox__caption{width:100%;min-height:42px;display:grid;gap:3px;margin:10px 0 0;color:rgba(255,255,255,.82);font-size:14px;line-height:1.5;text-align:center}.image-lightbox__caption-title{color:#fff;font-weight:700}.image-lightbox__caption-description{color:rgba(255,255,255,.78)}.image-lightbox__caption-note{color:rgba(255,255,255,.55);font-size:12px}.image-lightbox__close{position:absolute;top:0;right:0;z-index:2;width:40px;height:40px;border:1px solid rgba(255,255,255,.45);border-radius:50%;background:rgba(15,18,22,.72);color:#fff;font-size:28px;line-height:1;cursor:pointer}.image-lightbox__close:hover{background:#fff;color:#0f1216}@media(max-width:640px){.image-lightbox{padding:20px}.image-lightbox__content{padding-top:48px}.image-lightbox__media{height:min(64vh,520px)}.image-lightbox__caption{min-height:38px;margin-top:8px;font-size:13px}.image-lightbox__close{top:0;right:0}}';
    document.head.appendChild(styles);
    var sensitiveStyles = document.createElement('style');
    sensitiveStyles.textContent = '.image-sensitive-frame{position:relative}.image-sensitive-frame:after{position:absolute;inset:0;pointer-events:none;background:rgba(255,255,255,.06);content:""}';
    document.head.appendChild(sensitiveStyles);
    dialog = document.createElement('div');
    dialog.className = 'image-lightbox';
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-label', '이미지 크게 보기');
    dialog.setAttribute('aria-hidden', 'true');
    dialog.innerHTML = '<div class="image-lightbox__backdrop" data-lightbox-close></div><div class="image-lightbox__content"><button class="image-lightbox__close" type="button" aria-label="이미지 확대 닫기" data-lightbox-close>×</button><div class="image-lightbox__media"><img class="image-lightbox__image" alt=""></div><div class="image-lightbox__caption"><strong class="image-lightbox__caption-title"></strong><span class="image-lightbox__caption-description"></span><span class="image-lightbox__caption-note"></span></div></div>';
    document.body.appendChild(dialog);
    dialogImage = dialog.querySelector('.image-lightbox__image');
    captionTitle = dialog.querySelector('.image-lightbox__caption-title');
    captionDescription = dialog.querySelector('.image-lightbox__caption-description');
    captionNote = dialog.querySelector('.image-lightbox__caption-note');
    closeButton = dialog.querySelector('.image-lightbox__close');
    dialog.querySelectorAll('[data-lightbox-close]').forEach(function (element) { element.addEventListener('click', close); });
    document.addEventListener('keydown', function (event) { if (event.key === 'Escape') close(); });
  }

  function prepare(image) {
    if (image.closest(ignoredSelector)) return;
    image.classList.add('image-zoomable');
    image.setAttribute('tabindex', '0');
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', (image.alt || '이미지') + ' 크게 보기');
    if (isSensitive(image)) {
      image.classList.add('is-sensitive-image');
      image.style.filter = 'blur(8px) saturate(.8)';
      if (image.parentElement) image.parentElement.classList.add('image-sensitive-frame');
    }
    image.addEventListener('click', function () { open(image); });
    image.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(image); }
    });
  }

  function init() {
    makeDialog();
    document.querySelectorAll('p').forEach(function (paragraph) {
      if (paragraph.textContent.indexOf('(민감 정보 블러 처리)') !== -1) {
        paragraph.textContent = paragraph.textContent.replace(/\s*\(민감 정보 블러 처리\)/g, '');
      }
    });
    document.querySelectorAll(selector).forEach(prepare);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
}());
