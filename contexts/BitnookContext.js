import { createContext, useState } from 'react'

const BitnookContext = createContext(null)
const { Provider } = BitnookContext

const BitnookProvider = ({ children }) => {
	const [bitnook, setBitnook] = useState({
		files:{
			font: {
				name: 'Font',
				desc: 'System fonts used in the UI',
				defn: {
					name: {
						name: 'Name',
						desc: 'The name of the font',
						format: 'string'
					},
					desc: {
						name: 'Description',
						desc: 'A description of the font',
						format: 'string'
					},
					path: {
						name: 'File Path',
						desc: 'The TTF file path',
						format: 'string'
					}
				},
				files: {
					notoSerif: {
						name: 'NotoSerif',
						desc: 'Noto Serif 400 Regular',
						path: require('../node_modules/@expo-google-fonts/noto-serif/400Regular/NotoSerif_400Regular.ttf')
					},
					notoSans: {
						name: 'NotoSans',
						desc: 'Noto Sans 400 Regular',
						path: require('../node_modules/@expo-google-fonts/noto-sans/400Regular/NotoSans_400Regular.ttf')
					},
					robotoMono: {
						name: 'RobotoMono',
						desc: 'Roboto Mono 400 Regular',
						path: require('../node_modules/@expo-google-fonts/roboto-mono/400Regular/RobotoMono_400Regular.ttf')
					},
					bangers: {
						name: 'Bangers',
						desc: 'Bangers 400 Regular',
						path: require('../node_modules/@expo-google-fonts/bangers/400Regular/Bangers_400Regular.ttf')
					},
					schoolbell: {
						name: 'Schoolbell',
						desc: 'Schoolbell 400 Regular',
						path: require('../node_modules/@expo-google-fonts/schoolbell/400Regular/Schoolbell_400Regular.ttf')
					},
					meaCulpa: {
						name: 'MeaCulpa',
						desc: 'Mea Culpa 400 Regular',
						path: require('../node_modules/@expo-google-fonts/mea-culpa/400Regular/MeaCulpa_400Regular.ttf')
					}
				}
			},
			person: {
				name: 'Person',
				desc: 'A human being',
				defn: {
					name: {
						name: 'Name',
						desc: 'The name of the person',
						format: 'string'
					},
					desc: {
						name: 'Description',
						desc: 'A description of the person',
						format: 'multiline'
					}
				},
				files: {
					beckyChambers: {
						name: 'Becky Chambers',
						desc: 'Science fiction author'
					}
				}
			},
			book: {
				name: 'Book',
				desc: 'A written work',
				defn: {
					name: {
						name: 'Title',
						desc: 'The title of the book',
						format: 'string'
					},
					desc: {
						name: 'Description',
						desc: 'A description of the book',
						format: 'multiline'
					},
					author: {
						name: 'Authors',
						desc: 'The authors of the book',
						format: 'array',
						opts: { format: 'uuid', link: 'person' }
					},
					read: {
						name: 'Read?',
						desc: 'Have I finished reading the book?',
						format: 'boolean'
					},
					category: {
						name: 'Category',
						desc: 'Library category',
						format: 'enum',
						opts: {vals: {fiction:'Fiction',nonfiction:'Non-Fiction'}}
					},
					series: {
						name: 'Series',
						desc: 'Book series',
						format: 'string'
					},
					order: {
						name: 'Order',
						desc: 'Order in the series',
						format: 'integer'
					},
					created: {
						name: 'Created',
						desc: 'File creation timestamp',
						format: 'date'
					},
					updated: {
						name: 'Updated',
						desc: 'File last update timestamp',
						format: 'date'
					},
					review: {
						name: 'My Review',
						desc: 'What I think of the book',
						format: 'multiline'
					}
				},
				files: {
					aPsalmForTheWildBuilt:{
						name: 'A Psalm for the Wild-Built',
						desc: 'The first book in the Monk and Robot series',
						author: ['beckyChambers'],
						read: 'true',
						category: 'fiction',
						series: 'Monk and Robot',
						order: 1,
						review: 'It is really good!',
						created: '2025-01-01T00:00:00.000Z',
						updated: '2026-01-01T00:00:00.000Z'
					},
					aPrayerForTheCrownShy:{
						name: 'A Prayer for the Crown-Shy',
						desc: 'The second book in the Monk and Robot series',
						author: ['beckyChambers'],
						read: 'true',
						category: 'fiction',
						series: 'Monk and Robot',
						order: 2,
						review: 'Super adorable!',
						created: '2025-01-01T00:00:00.000Z',
						updated: '2026-01-01T00:00:00.000Z'
					}
				}
			}
		},
		config: {
			format: {
				defn: {
					name: {
						name: 'Name',
						desc: 'The name of the format',
						format: 'string'
					},
					desc: {
						name: 'Description',
						desc: 'A description of the format',
						format: 'multiline'
					},
					defn: {
						name: 'Definition',
						desc: 'The format data definition',
						format: 'object',
						opts:{}
					}
				}
			}
		}
	})

	return (<Provider value={{bitnook, setBitnook}}>
			{children}
		</Provider>)
}

export { BitnookProvider, BitnookContext }
