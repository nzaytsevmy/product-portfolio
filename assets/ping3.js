(() => {
  const story = document.querySelector('.ping3-story');
  const links = [...document.querySelectorAll('.ping3-toc a')];
  const sections = links.map(link => document.getElementById(link.hash.slice(1)));
  let frame = 0;
  let active = -1;

  function updateStory() {
    frame = 0;
    const readingLine = window.innerHeight * 0.35;
    const bounds = story.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (readingLine - bounds.top) / bounds.height));
    story.style.setProperty('--progress', progress * 100 + '%');

    let next = -1;
    for (const [index, section] of sections.entries()) {
      const top = section.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.8) section.classList.add('ping3-in-view');
      if (top <= readingLine) next = index;
    }

    if (active !== next) {
      links[active]?.removeAttribute('aria-current');
      links[next]?.setAttribute('aria-current', 'location');
      active = next;
    }
  }

  function requestUpdate() {
    if (!frame) frame = requestAnimationFrame(updateStory);
  }

  addEventListener('scroll', requestUpdate, { passive: true });
  addEventListener('resize', requestUpdate);
  addEventListener('pageshow', requestUpdate);
  story.addEventListener('toggle', requestUpdate, true);
  requestUpdate();
})();
