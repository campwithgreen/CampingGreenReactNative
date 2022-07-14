/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {LogBox} from 'react-native';
LogBox.ignoreLogs([
  'Remote debugger',
  'Non-serializable values were found in the navigation state',

  'Each child in a list should have a unique "key" prop.',
  "Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.",
  'RCTBridge required dispatch_sync to load RCTDevLoadingView. This may lead to deadlocks',
  ' componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.',
  '* Move code with side effects to componentDidMount, and set initial state in the constructor* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.',
  'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
  `Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.`,
  `TypeError: Cannot read properties of undefined (reading 'user')`,
  `VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.`,
  `Sending "onAnimatedValueUpdate" with no listeners registered.`,
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
  'No task registered for key ReactNativeFirebaseMessagingHeadlessTask',
  'Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.',
]);
AppRegistry.registerComponent(appName, () => App);
