import { useState }                        from 'react';

import { ElementFactory, ElementSearcher } from '@application/services';
import { ElementKinds }                    from '@domain/enums/ElementsKinds';
import { LocalStorageAdapter }             from '@infrastructure/storage/LocalStorageAdapter';
import { ElementSerializer }               from '@adapters/serializers/ElementSerializer';

import { SelectedElementProvider }         from './context/SelectedElementContext';
import { EditorHandlerContextProvider }    from './context/EditorHandlerContext';
import { ToolBar }                         from './ToolBar';
import { Editor }                          from './Editor';

import type { Page }                       from '@domain/entities';

const elementsRepository = new LocalStorageAdapter(new ElementSerializer());

function preparePage() {
	const persistentPage = elementsRepository.load();

	if (persistentPage) {
		return persistentPage;
	}

	const page      = new ElementFactory().createElement(ElementKinds.Page);
	const row       = new ElementFactory().createElement(ElementKinds.Row);
	const col       = new ElementFactory().createElement(ElementKinds.Column);
	const textBlock = new ElementFactory().createElement(ElementKinds.TextBlock);

	textBlock.setContent({ text: '# Untitled', alignment: 'center' });
	textBlock.setParentId(col.getId());

	col.setContent(textBlock);
	col.setParentId(row.getId());

	row.addColumn(col);
	row.setParentId(page.getId());

	page.addRow(row);

	return page;
}

const page     = preparePage();
const searcher = new ElementSearcher();

function App() {
	const [ appState, setAppState ] = useState<Page>(page);

	return (
		<div className='editor'>
			<SelectedElementProvider page={ page } searcher={ searcher }>
				<EditorHandlerContextProvider
					elementsRepository={ elementsRepository }
					page={ page }
					searcher={ searcher }
					updateAppState={ setAppState }
				>
					<Editor page={ appState } />

					<ToolBar />
				</EditorHandlerContextProvider>
			</SelectedElementProvider>
		</div>
	);
}

export { App };
