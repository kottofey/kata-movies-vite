import PropTypes from 'prop-types';
import { Typography, Flex, Tag, Card, Image, Rate } from 'antd';

import Spinner from '../Spinner';
import calcRatingColor from '../../utils/CalcRatingColor';
import getShortText from '../../utils/getShortText';

const { Paragraph } = Typography;

export default function Movie({
  movie,
  isLoaded,
  error,
  onRatingChange,
}) {
  return (
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
      {isLoaded ? (
        <MovieCardContent
          movie={movie}
          onRatingChange={onRatingChange}
        />
      ) : (
        <Spinner
          size='large'
          spinning={!error.isError}
        />
      )}
    </Card>
  );
}

function MovieCardContent({ movie, onRatingChange }) {
  const {
    id,
    altName,
    poster,
    name,
    year,
    description,
    rating,
    customRating,
    tags,
  } = movie;

  const singleRating =
    rating.kp ||
    rating.imdb ||
    rating.filmCritics ||
    rating.russianFilmCritics;

  const shortDescription = getShortText(description, 180);
  const ratingRounded = Math.round(singleRating * 10) / 10;
  const ratingColor = calcRatingColor(ratingRounded);
  const shortName = getShortText(name, 80);

  return (
    <Flex>
      <Image
        alt={`Movie poster for ${altName}`}
        src={poster.url || ''}
        preview={{ src: poster.previewUrl || '' }}
        fallback='https://fakeimg.pl/180x280/?text=No%0APreview%0AAvailable&font=lobster'
        placeholder={<Spinner size='small' />}
        style={{
          display: 'block',
          width: 180,
          height: 280,
        }}
      />
      <Flex
        vertical
        className='movie__body'
        style={{
          gap: 5,
          padding: 10,
          width: 300,
          position: 'relative',
        }}
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
          ellipsis={{
            tooltip: name,
            rows: 2,
          }}
          style={{
            marginBottom: 0,
            paddingRight: 32,
            maxHeight: 48,
            overflow: 'hidden',
            fontWeight: 'bold',
            fontSize: 20,
            fontFamily: 'Inter UI',
            lineHeight: 1.2,
          }}
        >
          {shortName}
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
            rows: 5,
          }}
          style={{ width: 250, marginBottom: 'auto' }}
        >
          {shortDescription}
        </Paragraph>
        <Rate
          allowClear
          defaultValue={0}
          value={customRating || 0}
          count={10}
          onChange={(r) => onRatingChange(id, r)}
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
    rating: PropTypes.shape({
      kp: PropTypes.number,
      imdb: PropTypes.number,
      filmCritics: PropTypes.number,
      russianFilmCritics: PropTypes.number,
    }),
    customRating: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
};
