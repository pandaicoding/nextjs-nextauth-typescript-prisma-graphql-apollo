import Head from 'next/head';
import { AwesomeLink } from '../../components/AwesomeLink';
import { gql, useQuery } from '@apollo/client';
import Layout from '../../components/layout';

const AllLinksQuery = gql`
  query allLinksQuery($first: Int, $after: String) {
    links(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          imageUrl
          url
          title
          category
          description
          id
        }
      }
    }
  }
`;

export default function ListProgram() {
  const { data, error, loading, fetchMore } = useQuery(AllLinksQuery, {
    variables: { first: 3 },
  });

  if (loading) return <p>Loading......</p>;

  if (error) return <p>Oops, something went wrong {error.message}</p>;

  const { hasNextPage, endCursor } = data.links.pageInfo;

  return (
    <Layout>
      <Head>
        <title>Awesome Links</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto max-w-5xl my-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data?.links.edges.map(({ node }: any) => (
            <AwesomeLink
              key={node.id}
              title={node.title}
              category={node.category}
              url={node.url}
              id={node.id}
              description={node.description}
              imageUrl={node.imageUrl}
            />
          ))}
        </div>
        {hasNextPage ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded my-10"
            onClick={() => {
              fetchMore({
                variables: { after: endCursor },
                updateQuery: (prevResult: any, { fetchMoreResult }: any) => {
                  fetchMoreResult.links.edges = [
                    ...prevResult.links.edges,
                    ...fetchMoreResult.links.edges,
                  ];
                  return fetchMoreResult;
                },
              });
            }}
          >
            more
          </button>
        ) : (
          <p className="my-10 text-center font-medium">
            You've reached the end!
          </p>
        )}
      </div>
    </Layout>
  );
}