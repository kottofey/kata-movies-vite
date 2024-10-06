import '../../fonts/InterUI.css';
import PropTypes from 'prop-types';
import { Typography, Flex, Tag, Card, Image, Alert } from 'antd';
import { Component } from 'react';

import Spinner from '../Spinner';

const { Paragraph } = Typography;

export default class Movie extends Component {
  state = {};

  render() {
    const { movie, isLoaded, error, onMoviesLoaded } = this.props;

    return (
      <Card
        onClick={() => onMoviesLoaded('призрак')}
        className='movie'
        styles={{
          body: {
            overflow: 'hidden',
            padding: 0,
            width: 450,
            height: 280,
            gap: 5,
          },
        }}
        hoverable
        bordered={false}
      >
        {error.isError ? (
          <Alert
            type='error'
            message={`${error.errorObj.error}: ${error.errorObj.statusCode}`}
            description={error.errorObj.message}
            closable
          />
        ) : null}
        {isLoaded ? <MovieCardContent movie={movie} /> : null}
        {!isLoaded && !error.isError ? <Spinner /> : null}
      </Card>
    );
  }
}

function MovieCardContent({ movie }) {
  const { altName, poster, name, year, description } = movie;

  const pos = description.indexOf(' ', 180);
  const shortDescription =
    pos === -1 ? description : `${description.slice(0, pos)}...`;

  return (
    <Flex>
      <Image
        alt={`Movie poster for ${altName}`}
        src={poster ? poster.url : ''}
        fallback='https://fakeimg.pl/180x280/?text=No%0APreview%0AAvailable&font=lobster'
        style={{
          display: 'block',
          width: 180,
          height: 280,
        }}
      />
      <Flex
        vertical
        className='movie__body'
        style={{ gap: 5, padding: 10 }}
      >
        <Paragraph
          className='movie__title'
          style={{
            marginBottom: 0,
            fontWeight: 'bold',
            fontSize: 20,
            fontFamily: 'Inter UI',
            lineHeight: 1.2,
          }}
        >
          {name}
        </Paragraph>
        <Paragraph
          style={{ marginBottom: 0 }}
          type='secondary'
          className='movie__date'
        >
          {year}
        </Paragraph>
        <Paragraph
          className=''
          style={{ marginBottom: 0 }}
        >
          <Tag>Action</Tag>
          <Tag>Drama</Tag>
        </Paragraph>
        <Paragraph
          ellipsis={{
            tooltip: description,
            rows: 6,
          }}
          style={{ width: 250 }}
        >
          {shortDescription}
        </Paragraph>
      </Flex>
    </Flex>
  );
}
MovieCardContent.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    year: PropTypes.number,
    description: PropTypes.string,
    poster: PropTypes.shape({
      url: PropTypes.string,
      previewUrl: PropTypes.string,
    }),
    altName: PropTypes.string,
  }),
};
