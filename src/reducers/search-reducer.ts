import { NiosxData_searchCollections_pageInfo_filters } from '@/queries/types/NiosxData';

type Action<T extends string, K extends unknown = never> = {
  type: T;
  payload: K;
};

export type FilterKey = keyof Omit<
  Omit<Omit<NiosxData_searchCollections_pageInfo_filters, 'blob'>, 'date'>,
  '__typename'
>;

export type Filters = Record<string, boolean>;

export const filterInit = (): Filters => ({});

export const filterReducer = (
  state: Filters,
  action: Action<'SET', Filters> | Action<'TOGGLE', string>,
) => {
  switch (action.type) {
    case 'SET':
      return {
        ...action.payload,
      };
    case 'TOGGLE':
      return {
        ...state,
        [action.payload]: !state[action.payload],
      };
    default:
      return state;
  }
};
