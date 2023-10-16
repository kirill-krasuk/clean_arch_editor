import { ElementFactory } from '@application/services';
import { ElementKinds }   from '@domain/enums/ElementsKinds';

import type { Column }    from '@domain/entities';
import type { Command }   from '@domain/interfaces/usecases/Command';

export class AddImageToColCommand implements Command {
	constructor(private receiver: Column) {}

	execute(): void {
		const imageBlock = new ElementFactory().createElement(ElementKinds.ImageBlock);
		this.receiver.setContent(imageBlock);

		imageBlock.setParentId(this.receiver.getId());
	}
}
