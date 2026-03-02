import topicHubsData from '@/data/articles/topic-hubs.json';
import type { BlogListItem } from '@/lib/blog';

export interface TopicHubDefinition {
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  intro: string;
  postSlugs: string[];
}

export interface TopicHubWithPosts {
  hub: TopicHubDefinition;
  posts: BlogListItem[];
}

const normalizeHub = (value: TopicHubDefinition): TopicHubDefinition => ({
  slug: value.slug.trim(),
  name: value.name.trim(),
  title: value.title.trim(),
  metaDescription: value.metaDescription.trim(),
  intro: value.intro.trim(),
  postSlugs: [...new Set(value.postSlugs.map((slug) => slug.trim()))],
});

const topicHubs: TopicHubDefinition[] = (topicHubsData as TopicHubDefinition[]).map(normalizeHub);

export const getTopicHubs = (): TopicHubDefinition[] => topicHubs;

export const getTopicHubBySlug = (slug: string): TopicHubDefinition | undefined =>
  topicHubs.find((hub) => hub.slug === slug);

export const getTopicHubPosts = (posts: BlogListItem[], hub: TopicHubDefinition): BlogListItem[] => {
  const postsBySlug = new Map(posts.map((post) => [post.slug, post]));
  return hub.postSlugs.map((slug) => postsBySlug.get(slug)).filter((post): post is BlogListItem => Boolean(post));
};

export const getIndexableTopicHubs = (
  posts: BlogListItem[],
  minPostsToIndex = 2,
): TopicHubWithPosts[] =>
  topicHubs
    .map((hub) => ({ hub, posts: getTopicHubPosts(posts, hub) }))
    .filter((entry) => entry.posts.length >= minPostsToIndex);
