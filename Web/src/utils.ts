import ImageService from "@services/image-service";

interface Identity {
    id: number;
}

interface HasName {
    name: string;
}

export const computeBackgroundStyle = (link) =>
    `url(${link}) center center / cover no-repeat`;

export const trackById = (index: number, item: Identity) => {
    return item.id;
};

export const trackByName = (element: HasName, index: number) => {
    return element.name;
};

export const createClipPath = () => {
    let result = "polygon(0% 0%,";

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
};

export const sendFile = async (
    imageService: ImageService,
    image: File,
    formData: any
) => {
    const chunkSize = 1024 * 64;
    const chunksAmount = Math.ceil(image.size / chunkSize);
    let chunkIndex = 0;
    let indexStart = 0;
    let indexEnd = indexStart + chunkSize;
    let imageId = null;

    if (chunksAmount === 1) {
        indexEnd = chunkSize;
    }

    do {
        const blob = image.slice(indexStart, indexEnd);
        const buffer = await (blob as any).arrayBuffer();
        const array = new Uint8Array(buffer);

        const result = await imageService
            .addImage({
                ...formData,
                fileType: image.type,
                fileName: image.name,
                imageId,
                data: array,
                offset: indexStart,
            })
            .toPromise();

        this.progressValue = chunkIndex / (chunksAmount - 1);

        await new Promise((resolve, reject) => setTimeout(resolve, 100));

        imageId = result.imageId;

        indexStart = indexEnd;

        if (indexStart + chunkSize > image.size) {
            indexEnd = image.size;
        } else {
            indexEnd = indexStart + chunkSize;
        }

        chunkIndex = chunkIndex + 1;
    } while (chunksAmount > chunkIndex);
};
