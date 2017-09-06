const projectList = document.querySelector('.project-list');

const midDiv = projectList.offsetTop + projectList.offsetHeight / 2;
const bottomDiv = projectList.offsetTop + projectList.offsetHeight * 2;

window.addEventListener('scroll', () => {
  const windowBottom = window.scrollY + window.innerHeight;
  if (windowBottom > midDiv && windowBottom < bottomDiv) {
    projectList.style.left = 0;
  } else {
    projectList.style.left = '-100vw';
  }
})
