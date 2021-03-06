import { graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import HeroHeader from '../components/heroHeader';
import Layout from '../components/layout';
import PostLink from '../components/post-link';

const IndexPage = ({
  data: {
    site,
    allMarkdownRemark: { edges }
  }
}) => {
  const Posts = edges
    .filter(
      (edge) =>
        !!edge.node.frontmatter.date &&
        edge.node.frontmatter.template === 'BlogPost'
    ) // You can filter your posts based on some criteria
    .map((edge) => <PostLink key={edge.node.id} post={edge.node} />);

  const Projects = edges
    .filter(
      (edge) =>
        !!edge.node.frontmatter.date &&
        edge.node.frontmatter.template === 'ProjectPost'
    ) // You can filter your posts based on some criteria
    .map((edge) => <PostLink key={edge.node.id} post={edge.node} />);

  return (
    <Layout>
      <Helmet>
        <title>{site.siteMetadata.title}</title>
        <meta name="description" content={site.siteMetadata.description} />
        {!site.siteMetadata.w3l_dom_key ? null : (
          <meta
            name="w3l-domain-verification"
            content={site.siteMetadata.w3l_dom_key}
          />
        )}
      </Helmet>
      <HeroHeader />
      <h2>Blog Posts &darr;</h2>
      <div className="grids">{Posts}</div>
      <h2 style={{ marginTop: '30px' }}>Personal projects &darr;</h2>
      <div className="grids">{Projects}</div>
    </Layout>
  );
};

export default IndexPage;
export const pageQuery = graphql`
  query indexPageQuery {
    site {
      siteMetadata {
        title
        description
        w3l_dom_key
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            thumbnail
            template
          }
        }
      }
    }
  }
`;
