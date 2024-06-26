import { Icons }               from '@infrastructure/ui/icons';
import { ElementGuardService } from '@application/services';

import { useEditorHandler }    from '../context/EditorHandlerContext';
import { useSelectedElement }  from '../context/SelectedElementContext';

function ColumnEditor() {
	const { setRowType }                         = useEditorHandler();
	const { selectedElementId, selectedElement } = useSelectedElement();

	if (!selectedElement) {
		return null;
	}

	return (
		<div className='section'>
			<div className='section-header'>
				Column
			</div>

			<div className='button-group-field'>
				<label htmlFor='contents'>
					Contents
				</label>

				<div className='button-group' id='contents'>
					<button
						className={
							ElementGuardService.isTextBlock(selectedElement?.getContent())
								? 'selected'
								: ''
						}
						onClick={ () => {
							setRowType(selectedElementId!, 'text');
						} }
					>
						<Icons.Text />
					</button>

					<button
						className={
							ElementGuardService.isImageBlock(
								selectedElement?.getContent()
							)
								? 'selected'
								: ''
						}
						onClick={ () => {
							setRowType(selectedElementId!, 'image');
						} }
					>
						<Icons.Image />
					</button>
				</div>
			</div>
		</div>
	);
}

export { ColumnEditor };
