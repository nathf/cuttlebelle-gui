//@flow
import createReactContext, { type Context } from 'create-react-context';

export type CuttlebelleConfig = {
  githubAccessToken: ?string,
  projectPath: ?string
};

const CuttlebelleContext: Context<CuttlebelleConfig> = createReactContext({
  githubAccessToken: undefined,
  projectPath: undefined
});

export default CuttlebelleContext;
