import { render } from "../../test-utils";
import { AlertsList } from "../../../src/dashboard/components/alerts-list";
import { AlertsContext } from "../../../src/dashboard/contexts/alerts-context";

const notificationsTheme = {
	bulletClass: "yst-fill-blue-500",
};

jest.mock( "@wordpress/data", () => ( {
	useDispatch: jest.fn( () => ( { toggleAlertStatus: jest.fn() } ) ),
} ) );

describe( "AlertsList", () => {
	it( "should match snapshot", () => {
		const items = [
			{
				id: "test-id-1",
				message: "You've added a new type of content. We recommend that you review the corresponding Search appearance settings.",
				type: "warning",
				dismissed: false,
			},
			{
				id: "test-id-2",
				message: "We notice that you have installed WPML. To make sure your canonical URLs are set correctly, install and activate the WPML SEO add-on as well!",
				type: "warning",
				dismissed: false,
			},
			{
				id: "test-id-3",
				message: "Huge SEO Issue: You're blocking access to robots. If you want search engines to show this site in their results, you must go to your Reading Settings and uncheck the box for Search Engine Visibility. I don't want this site to show in the search results.",
				type: "warning",
				dismissed: true,
			},
			{
				id: "test-id-4",
				message: "We need to re-analyze some of your SEO data because of a change in the visibility of your taxonomies. Please help us do that by running the SEO data optimization. We estimate this will take less than a minute.",
				type: "warning",
				dismissed: true,
			},
		];
		const { container } = render( <AlertsContext.Provider value={ notificationsTheme }>
			<AlertsList items={ items } />
		</AlertsContext.Provider> );
		expect( container ).toMatchSnapshot();
	} );
} );