const lessonBehavior = document.createElement('script');
lessonBehavior.src = location.pathname.includes('quanti-anni-hai-conversazione') ? 'quanti-anni-hai-conversazione.js' : 'come-posso-contattarti-conversazione.js?v=6';
document.head.append(lessonBehavior);

const familyLayout = document.createElement('style');
familyLayout.textContent = `.patterns article{padding:30px 28px 32px;min-height:245px}.patterns article:nth-child(odd){border-right:1px solid #d9dde3}.patterns h3{margin:0 0 14px;font:600 26px/1.25 Georgia}.patterns article>p{margin:0 0 15px;font:17px/1.55 Georgia}.patterns article>b{display:inline-block;margin-top:5px;font:700 18px/1.55 Arial}.patterns .cn{margin:9px 0 16px}footer{margin-top:58px}`;
document.head.append(familyLayout);
