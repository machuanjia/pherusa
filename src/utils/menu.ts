/** @format */

export const initMenu = () => {
  // @ts-ignore
  const menu = new LaiyePublic({
    mode: 'dev',
    ativeSrc: 'partners',
    navCurretElement: document.getElementById('header'),
  })
  return menu
}
