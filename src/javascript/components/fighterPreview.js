import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  if (fighter != undefined) {
    // Image
    fighterElement.appendChild(createFighterImage(fighter));
    // Name
    let nameElement = createElement({ tagName: 'p', className: 'fighter-preview___name' })
    nameElement.innerHTML = fighter.name.toUpperCase();
    fighterElement.appendChild(nameElement);
    // Stats
    for (const detail in fighter) {
      if (detail !== 'name' && detail !== '_id' && detail !== 'source') {
        let statRow = createElement({ tagName: 'div', className: 'fighter-preview___stat-row' });
        let statRowHead = createElement({ tagName: 'div', className: 'fighter-preview___stat-row-head' });
        statRowHead.innerHTML = `${detail}`;
        let statRowValue = createElement({ tagName: 'div', className: 'fighter-preview___stat-row-value' });
        statRowValue.innerHTML = `${fighter[detail]}`;
        statRow.appendChild(statRowHead);
        statRow.appendChild(statRowValue);
        fighterElement.appendChild(statRow);
      }
    }
  }
  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
