import PropTypes from 'prop-types';
import {
  Typography,
  Flex,
  Tag,
  Card,
  Image,
  Alert,
  Rate,
} from 'antd';

import Spinner from '../Spinner';

const { Paragraph } = Typography;

export default function Movie({ movie, isLoaded, error }) {
  return (
    //   <Alert
    //     type='error'
    //     message={`${error.errorObj.error}: ${error.errorObj.statusCode}`}
    //     description={error.errorObj.message}
    //     closable
    //   />
    <Card
      className='movie'
      styles={{
        body: {
          padding: 0,
          overflow: 'hidden',
          width: 480,
          height: 280,
          borderRadius: '8px',
          boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
        },
      }}
      hoverable
      bordered
    >
      {isLoaded ? <MovieCardContent movie={movie} /> : null}
      {!isLoaded && !error.isError ? <Spinner /> : null}
    </Card>
  );
}

function MovieCardContent({ movie }) {
  const {
    id,
    altName,
    poster,
    name,
    year,
    description,
    rating,
    tags,
  } = movie;

  const pos = description.indexOf(' ', 180);
  const shortDescription =
    pos === -1 ? description : `${description.slice(0, pos)}...`;

  let ratingColor;
  const ratingRounded = Math.round(rating);

  if (ratingRounded < 3) {
    ratingColor = '#E90000';
  } else if (ratingRounded >= 3 && ratingRounded < 5) {
    ratingColor = '#E97E00';
  } else if (ratingRounded >= 5 && ratingRounded < 7) {
    ratingColor = '#E9D100';
  } else {
    ratingColor = '#66E900';
  }

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
        style={{ gap: 5, padding: 10, width: 300 }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            width: 30,
            height: 30,
            top: 10,
            right: 10,
            borderRadius: '50%',
            border: '2px solid',
            borderColor: ratingColor,
          }}
        >
          {ratingRounded}
        </div>
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
          className='movie__date'
          style={{ marginBottom: 0 }}
          type='secondary'
        >
          {year}
        </Paragraph>
        <Paragraph
          className='movie__tags'
          style={{ marginBottom: 0 }}
        >
          {tags.map((tag) => (
            <Tag key={`tag${tag}`}>{tag}</Tag>
          ))}
        </Paragraph>
        <Paragraph
          ellipsis={{
            tooltip: description,
            rows: 6,
          }}
          style={{ width: 250, marginBottom: 'auto' }}
        >
          {shortDescription}
        </Paragraph>
        <Rate
          allowClear
          defaultValue={ratingRounded}
          count={10}
        />
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
    rating: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
};
