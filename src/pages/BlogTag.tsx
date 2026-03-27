import { Navigate, useLocation, useParams } from 'react-router-dom';
import legacyTagToTopic from '@/data/articles/legacy-tag-to-topic.json';
import { getTopicHubBySlug } from '@/lib/topic-hubs';

type LegacyTagTopicMap = Record<string, string>;

const tagToTopicMap: LegacyTagTopicMap = legacyTagToTopic as LegacyTagTopicMap;

const BlogTag = () => {
  const { tag } = useParams<{ tag: string }>();
  const location = useLocation();

  const tagSlug = tag ?? '';
  const topicSlug = tagSlug ? tagToTopicMap[tagSlug] : undefined;
  const topic = topicSlug ? getTopicHubBySlug(topicSlug) : undefined;
  const suffix = `${location.search}${location.hash}`;
  const targetPath = topic ? `/blog/topic/${topic.slug}` : '/blog';

  return <Navigate to={`${targetPath}${suffix}`} replace />;
};

export default BlogTag;
