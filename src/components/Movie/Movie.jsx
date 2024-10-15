import PropTypes from 'prop-types';
import {
  Typography,
  Flex,
  Tag,
  Card,
  Image,
  Rate,
  Row,
  Col,
} from 'antd';

import Spinner from '../Spinner';
import calcRatingColor from '../../utils/CalcRatingColor';
import getShortText from '../../utils/getShortText';

const { Paragraph } = Typography;

export default function Movie({
  movie,
  isLoaded,
  isMobile,
  error,
  onRatingChange,
}) {
  return (
    <Flex className='movie'>
      {isLoaded ? (
        <MovieCardContent
          movie={movie}
          onRatingChange={onRatingChange}
          isMobile={isMobile}
        />
      ) : (
        <Spinner
          size='large'
          spinning={!error.isError}
        />
      )}
    </Flex>
  );
}

function MovieCardContent({ movie, onRatingChange, isMobile }) {
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

  const styles = {
    card: {
      body: {
        overflow: 'hidden',
        width: isMobile ? 336 : 480,
        height: isMobile ? 240 : 280,
        padding: isMobile ? 0 : 0,
        borderRadius: '6px',
        boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.15)',
      },
    },
    rating: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      width: 30,
      height: 30,
      top: 7,
      right: 7,
      borderRadius: '50%',
      border: '2px solid',
      borderColor: ratingColor,
      zIndex: 1,
    },
    mobile: {
      poster: {
        height: 84,
        width: 56,
        margin: '8px 0 0 8px',
      },
      title: {
        // backgroundColor: 'darkred',
        margin: '8px 0 0 12px',
        paddingRight: 44,
        // width: 200,
        // height: 40,
        overflow: 'hidden',
        fontWeight: 'bold',
        fontSize: 15,
        fontFamily: 'Inter UI',
        lineHeight: 1.2,
      },
      year: {
        // backgroundColor: 'tomato',
        margin: '0 0 0 12px',
        // height: 28,
        // marginBottom: 4,
      },
      tags: {
        // backgroundColor: 'pink',
        height: 26,
        margin: '0 0 0 12px',
        display: 'flex',
        alignItems: 'center',
      },
      desc: { padding: 8 },
      stars: {},
    },
    regular: {
      poster: {
        display: 'block',
        width: 180,
        height: 280,
        // backgroundColor: 'tomato',
      },
      title: {
        padding: '10px 38px 0 10px',
        // margin: 0,
        maxHeight: 62,
        overflow: 'hidden',
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily: 'Inter UI',
        lineHeight: 1.2,
        // backgroundColor: 'pink',
      },
      year: {
        padding: '0 10px',
        // marginBottom: 0,
        // backgroundColor: 'lightgreen',
      },
      tags: {
        padding: '0 10px',
        // marginBottom: 0,
        // backgroundColor: 'skyblue',
      },
      desc: {
        padding: '0 10px',
        // marginBottom: 'auto',
        // backgroundColor: 'brown',
      },
      stars: {
        marginLeft: 18,
        // backgroundColor: 'gold',
      },
    },
  };

  return (
    <Card
      hoverable
      bordered
      styles={{
        body: styles.card.body,
      }}
    >
      <div
        style={{
          ...styles.rating,
        }}
      >
        {ratingRounded}
      </div>

      <Row gutter={[{ sm: 0, xs: 0 }, 0]}>
        {/* <Row gutter={[{ sm: 0, xs: 10 }, 8]}> */}
        <Col
          sm={9}
          xs={4}
        >
          <Image
            alt={`Movie poster for ${altName}`}
            src={poster.url || ''}
            preview={{ src: poster.previewUrl || '' }}
            fallback='https://fakeimg.pl/180x280/?text=No%0APreview%0AAvailable&font=lobster'
            placeholder={<Spinner size='small' />}
            style={
              isMobile ? styles.mobile.poster : styles.regular.poster
            }
          />
        </Col>
        <Col
          sm={15}
          xs={20}
        >
          <Paragraph
            className='movie__title'
            ellipsis={{
              tooltip: name,
              rows: 2,
            }}
            style={
              isMobile ? styles.mobile.title : styles.regular.title
            }
          >
            {shortName}
          </Paragraph>
          <Paragraph
            className='movie__date'
            style={
              isMobile ? styles.mobile.year : styles.regular.year
            }
            type='secondary'
          >
            {year}
          </Paragraph>
          <Paragraph
            className='movie__tags'
            style={
              isMobile ? styles.mobile.tags : styles.regular.tags
            }
          >
            {tags.map((tag) => (
              <Tag key={`tag${tag}`}>{tag}</Tag>
            ))}
          </Paragraph>
          {!isMobile && (
            <>
              <Paragraph
                ellipsis={{
                  tooltip: description,
                  rows: 5,
                }}
                style={styles.regular.desc}
              >
                {shortDescription}
              </Paragraph>
              <Rate
                style={styles.regular.stars}
                allowClear
                defaultValue={0}
                value={customRating || 0}
                count={10}
                onChange={(r) => onRatingChange(id, r)}
              />
            </>
          )}
        </Col>
        {isMobile && (
          <>
            <Col span={24}>
              <Paragraph
                ellipsis={{
                  tooltip: description,
                  rows: 5,
                }}
                style={styles.mobile.desc}
              >
                {shortDescription}
              </Paragraph>
            </Col>
            <Col
              span={20}
              push={4}
            >
              <Rate
                style={styles.mobile.stars}
                allowClear
                defaultValue={0}
                value={customRating || 0}
                count={10}
                onChange={(r) => onRatingChange(id, r)}
              />
            </Col>
          </>
        )}
      </Row>
    </Card>
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
