import { Header } from '@/components/Header';
import { graphql, PageProps } from 'gatsby';
import React from 'react';
import { NiosxDataQuery } from '../../graphql-types';
import * as styles from '../styles/search.module.css';

const keysOf = <T extends Record<string, unknown>>(o: T): Array<keyof T> =>
  Object.keys(o);

const Search: React.FC<PageProps<NiosxDataQuery>> = ({ data }) => (
  <main>
    <Header title="Search Page" />
    <div>
      <div>Search Bar</div>
      <div className={styles.container}>
        <div>
          {data.niosx.searchCollections.pageInfo.filters
            ? keysOf(data.niosx.searchCollections.pageInfo.filters).map((key) =>
                key !== 'blob' ? (
                  <div key={key}>
                    <h3>{key}</h3>
                    {data.niosx.searchCollections.pageInfo.filters[key].map(
                      (f) => (
                        <div key={f.id}>
                          {f.displayName} ({f.recordCount ?? '--'})
                        </div>
                      ),
                    )}
                  </div>
                ) : (
                  ''
                ),
              )
            : ''}
        </div>
        <div>
          {data.niosx.searchCollections.edges.map((e) => (
            <div key={e.node.graphId}>{JSON.stringify(e.node)}</div>
          )) ?? <div>No Records Found</div>}
        </div>
      </div>
    </div>
  </main>
);

export default Search;

export const query = graphql`
  query NiosxData {
    niosx {
      searchCollections {
        edges {
          node {
            graphId
            title
            partner
            subjects
            dateOfCreation
            images {
              src
              alt
              size
            }
          }
          cursor
          offset
          isDirectMatch
          annotationMatchCount
        }
        pageInfo {
          endCursor
          hasNextPage
          filters {
            blob
            lang {
              id
              displayName
              recordCount
            }
            subjects {
              id
              displayName
              recordCount
            }
          }
        }
      }
    }
  }
`;
