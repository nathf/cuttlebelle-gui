//@flow
import createReactContext, { type Context } from 'create-react-context';

export type GithubToken = ?string;

const GithubTokenContext: Context<GithubToken> = createReactContext(undefined);

export const TOKEN_STORAGE_KEY = 'githubAccessToken';
export default GithubTokenContext;