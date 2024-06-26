import { SerializedColumnDTO } from './SerializedColumnDTO';
import { SerializedObjectDTO } from './SerializedObjectDTO';

import type { Row }            from '@domain/aggregates';

export class SerializedRowDTO extends SerializedObjectDTO {
	constructor(row: Row) {
		super();
		this.id       = row.getId();
		this.content  = row.getContent().map(col => new SerializedColumnDTO(col));
		this.parentId = row.getParentId();
		this.__kind   = row.getKind();
	}
}
