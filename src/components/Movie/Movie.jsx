import { Typography, Flex, Tag, Card, Image } from 'antd';
import '../../fonts/InterUI.css';

const { Paragraph, Text } = Typography;

export default function Movie({ name, year, description, poster }) {
  const pos = description.indexOf(' ', 180);
  const shortDescription =
    pos === -1 ? description : `${description.slice(0, pos)}...`;

  return (
    <Card
      className='movie'
      styles={{
        body: {
          padding: 0,
          width: 450,
          height: 280,
          borderRadius: 'unset',
          gap: 5,
        },
      }}
      hoverable
    >
      <Flex>
        <Image
          alt='Movie poster'
          preview={{
            src: poster.url,
          }}
          src={poster.url}
          fallback='https://fakeimg.pl/180x280/?text=No%0APreview%0AAvailable&font=lobster'
          style={{ display: 'block', width: 180, height: 280 }}
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
    </Card>
  );
}
