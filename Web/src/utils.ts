interface Identity {
  id: number;
}

interface HasName {
  name: string;
}

export const computeBackgroundStyle = (link) => `url(${link}) center center / cover no-repeat`

export const trackById = (index: number, item: Identity) => {
  return item.id;
}

export const trackByName = (element: HasName, index: number) => {
  return element.name;
}

export const createClipPath = () => {
    let result = 'polygon(0% 0%,';

    const random = (from, to) => Math.floor(Math.random() * (to - from) + from);
    
    result = result + `${random(0, 30)}% 5%,`;
    result = result + `${random(30, 70)}% 0%,`;
    result = result + `${random(70, 90)}% 5%,`;
    result = result + `100% 0%,`;
    result = result + `95% ${random(0, 30)}%,`;
    result = result + `100% ${random(30, 70)}%,`;
    result = result + `95% ${random(70, 90)}%,`;
    result = result + `100% 100%,`;
    result = result + `${random(70, 90)}% 95%,`;
    result = result + `${random(40, 70)}% 100%,`;
    result = result + `${random(0, 30)}% 95%,`;
    result = result + `0% 100%,`;
    result = result + `5% ${random(70, 90)}%,`;
    result = result + `0% ${random(40, 70)}%,`;
    result = result + `5% ${random(0, 40)}%,`;
    result = result + `0% 0%)`;

    return result;
  }