import { createStore, StoreCore } from "@priolo/jon";



/**
 * Store for the general page layout formatting
 */
const setup = {

	state: {
		/** indicates that there is a loading process */
		busy: false,
	},

	getters: {},

	actions: {
	},

	mutators: {
		setBusy: (busy: boolean) => ({busy}),
	},
};

export type LayoutState = typeof setup.state;
export type LayoutGetters = typeof setup.getters;
export type LayoutActions = typeof setup.actions;
export type LayoutMutators = typeof setup.mutators;
export interface LayoutStore extends StoreCore<LayoutState>, LayoutGetters, LayoutActions, LayoutMutators {
	state: LayoutState;
}

const layoutSo = createStore<LayoutState>(setup);

export default layoutSo as LayoutStore;
