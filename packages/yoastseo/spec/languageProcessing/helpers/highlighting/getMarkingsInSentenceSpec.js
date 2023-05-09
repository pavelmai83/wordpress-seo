import getMarkingsInSentence from "../../../../src/languageProcessing/helpers/highlighting/getMarkingsInSentence";
import Mark from "../../../../src/values/Mark";
import JapaneseCustomHelper from "../../../../src/languageProcessing/languages/ja/helpers/matchTextWithWord";

/* eslint-disable max-len */
const testCases = [
	{
		testDescription: "No markings in sentence",
		sentence: { text: "This is a sentence.", sourceCodeRange: { startOffset: 0, endOffset: 18 } },
		matchesInSentence: { primaryMatches: [], secondaryMatches: [] },
		matchWordCustomHelper: false,
		locale: "en_US",
		expectedResult: [],
	},
	{
		testDescription: "One marking in sentence",
		sentence: { text: "This is a sentence.", sourceCodeRange: { startOffset: 0, endOffset: 18 } },
		matchesInSentence: { primaryMatches: [ [ { sourceCodeRange: { startOffset: 0, endOffset: 4 } } ] ], secondaryMatches: [] },
		matchWordCustomHelper: false,
		locale: "en_US",
		expectedResult: [ new Mark( {
			marked: "<yoastmark class='yoast-text-mark'>This</yoastmark> is a sentence.",
			original: "This is a sentence.",
			position: { endOffset: 4, startOffset: 0 },
		} ) ],
	},
	{
		testDescription: "One marking in sentence with two consecutive matches",
		sentence: { text: "This is a sentence.", sourceCodeRange: { startOffset: 0, endOffset: 18 } },
		matchesInSentence: { primaryMatches: [ [ { sourceCodeRange: { startOffset: 0, endOffset: 4 } }, { sourceCodeRange: { startOffset: 5, endOffset: 7 } } ] ], secondaryMatches: [] },
		matchWordCustomHelper: false,
		locale: "en_US",
		expectedResult: [ new Mark( {
			marked: "<yoastmark class='yoast-text-mark'>This is</yoastmark> a sentence.",
			original: "This is a sentence.",
			position: { endOffset: 7, startOffset: 0 },
		} ) ],
	},
	{
		testDescription: "Two markings that are not consecutive in sentence",
		sentence: { text: "This is a sentence.", sourceCodeRange: { startOffset: 0, endOffset: 18 } },
		matchesInSentence: { primaryMatches: [ [ { sourceCodeRange: { startOffset: 0, endOffset: 4 } } ], [ { sourceCodeRange: { startOffset: 10, endOffset: 18 } } ] ], secondaryMatches: [] },
		matchWordCustomHelper: false,
		locale: "en_US",
		expectedResult: [
			new Mark( {
				marked: "<yoastmark class='yoast-text-mark'>This</yoastmark> is a <yoastmark class='yoast-text-mark'>sentence</yoastmark>.",
				original: "This is a sentence.",
				position: { endOffset: 4, startOffset: 0 },
			} ),
			new Mark( {
				marked: "<yoastmark class='yoast-text-mark'>This</yoastmark> is a <yoastmark class='yoast-text-mark'>sentence</yoastmark>.",
				original: "This is a sentence.",
				position: { endOffset: 18, startOffset: 10 },
			} ),
		],
	},
	{
		testDescription: "One marking in a sentence that has a non-zero startOffset",
		sentence: { text: "This is a sentence.", sourceCodeRange: { startOffset: 10, endOffset: 38 } },
		matchesInSentence: { primaryMatches: [ [ { sourceCodeRange: { startOffset: 10, endOffset: 14 } } ] ], secondaryMatches: [] },
		matchWordCustomHelper: false,
		locale: "en_US",
		expectedResult: [ new Mark( {
			marked: "<yoastmark class='yoast-text-mark'>This</yoastmark> is a sentence.",
			original: "This is a sentence.",
			position: { endOffset: 14, startOffset: 10 },
		} ) ],
	},
	{
		testDescription: "One marking in a sentence of a language that does not use spaces",
		sentence: { text: "これは文です.", sourceCodeRange: { startOffset: 0, endOffset: 7 } },
		matchesInSentence: { primaryMatches: [ [ { sourceCodeRange: { startOffset: 3, endOffset: 4 } } ] ], secondaryMatches: [] },
		matchWordCustomHelper: JapaneseCustomHelper,
		locale: "ja",
		expectedResult: [ new Mark( {
			marked: "これは<yoastmark class='yoast-text-mark'>文</yoastmark>です.",
			original: "これは文です.",
			position: { endOffset: 4, startOffset: 3 },
		} ) ],
	},
	{
		testDescription: "Two markings that overlap",
		sentence: { text: "This is a sentence.", sourceCodeRange: { startOffset: 0, endOffset: 18 } },
		matchesInSentence: { primaryMatches: [ [ { sourceCodeRange: { startOffset: 0, endOffset: 7 } } ], [ { sourceCodeRange: { startOffset: 5, endOffset: 9 } } ] ], secondaryMatches: [] },
		matchWordCustomHelper: false,
		locale: "en_US",
		expectedResult: [
			new Mark( {
				marked: "<yoastmark class='yoast-text-mark'>This is a</yoastmark> sentence.",
				original: "This is a sentence.",
				position: { endOffset: 9, startOffset: 0 },
			} ),
		],
	},
];
/* eslint-enable max-len */

// eslint-disable-next-line max-len
describe.each( testCases )( "getMarkingsInSentence", ( { testDescription, sentence, matchesInSentence, matchWordCustomHelper, locale, expectedResult } ) => {
	it( testDescription, () => {
		expect( getMarkingsInSentence( sentence, matchesInSentence, matchWordCustomHelper, locale ) ).toEqual( expectedResult );
	} );
} );