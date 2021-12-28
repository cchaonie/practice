const ReactDOM = {
  createPortal,

  findDOMNode(componentOrElement: Element | ?React$Component<any, any>) {
    if (componentOrElement == null) {
      return null;
    }
    if ((componentOrElement: any).nodeType === ELEMENT_NODE) {
      return (componentOrElement: any);
    }
    return findHostInstance(componentOrElement);
  },

  hydrate(element: React$Node, container: DOMContainer, callback: ?Function) {
    invariant(
      isValidContainer(container),
      'Target container is not a DOM element.',
    );
    // TODO: throw or warn if we couldn't hydrate?
    return legacyRenderSubtreeIntoContainer(
      null,
      element,
      container,
      true,
      callback,
    );
  },

  render(
    element: React$Element<any>,
    container: DOMContainer,
    callback: ?Function,
  ) {
    return legacyRenderSubtreeIntoContainer(
      null,
      element,
      container,
      false,
      callback,
    );
  },

  unmountComponentAtNode(container: DOMContainer) {
    invariant(
      isValidContainer(container),
      'unmountComponentAtNode(...): Target container is not a DOM element.',
    );
    if (container._reactRootContainer) {
      unbatchedUpdates(() => {
        legacyRenderSubtreeIntoContainer(null, null, container, false, () => {
          container._reactRootContainer = null;
        });
      });
      return true;
    } else {
      return false;
    }
  },
  flushSync: flushSync
};

function legacyRenderSubtreeIntoContainer(
  parentComponent: ?React$Component<any, any>,
  children: ReactNodeList,
  container: DOMContainer,
  forceHydrate: boolean,
  callback: ?Function,
) {
  // TODO: Without `any` type, Flow says "Property cannot be accessed on any
  // member of intersection type." Whyyyyyy.
  let root: _ReactSyncRoot = (container._reactRootContainer: any);
  let fiberRoot;
  if (!root) {
    // Initial mount
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
      container,
      forceHydrate,
    );
    fiberRoot = root._internalRoot;
    if (typeof callback === 'function') {
      const originalCallback = callback;
      callback = function () {
        const instance = getPublicRootInstance(fiberRoot);
        originalCallback.call(instance);
      };
    }
    // Initial mount should not be batched.
    unbatchedUpdates(() => {
      updateContainer(children, fiberRoot, parentComponent, callback);
    });
  } else {
    fiberRoot = root._internalRoot;
    if (typeof callback === 'function') {
      const originalCallback = callback;
      callback = function () {
        const instance = getPublicRootInstance(fiberRoot);
        originalCallback.call(instance);
      };
    }
    // Update
    updateContainer(children, fiberRoot, parentComponent, callback);
  }
  return getPublicRootInstance(fiberRoot);
}

function legacyCreateRootFromDOMContainer(
  container: DOMContainer,
  forceHydrate: boolean,
): _ReactSyncRoot {
  const shouldHydrate = forceHydrate || shouldHydrateDueToLegacyHeuristic(container);
  // First clear any existing content.
  if (!shouldHydrate) {
    let warned = false;
    let rootSibling;
    while ((rootSibling = container.lastChild)) {
      container.removeChild(rootSibling);
    }
  }
  // Legacy roots are not batched.
  return new ReactSyncRoot(
    container,
    LegacyRoot,
    shouldHydrate ? { hydrate: true, } : undefined,
  );
}

function ReactSyncRoot(
  container: DOMContainer,
  tag: RootTag,
  options: void | RootOptions,
) {
  // Tag is either LegacyRoot or Concurrent Root
  const hydrate = options != null && options.hydrate === true;
  const hydrationCallbacks = (options != null && options.hydrationOptions) || null;
  const root = createContainer(container, tag, hydrate, hydrationCallbacks);
  this._internalRoot = root;
  markContainerAsRoot(root.current, container);
}

export function createContainer(
  containerInfo: Container,
  tag: RootTag,
  hydrate: boolean,
  hydrationCallbacks: null | SuspenseHydrationCallbacks,
): OpaqueRoot {
  return createFiberRoot(containerInfo, tag, hydrate, hydrationCallbacks);
}

export function createFiberRoot(
  containerInfo: any,
  tag: RootTag,
  hydrate: boolean,
  hydrationCallbacks: null | SuspenseHydrationCallbacks,
): FiberRoot {
  const root: FiberRoot = (new FiberRootNode(containerInfo, tag, hydrate): any);
  if (enableSuspenseCallback) {
    root.hydrationCallbacks = hydrationCallbacks;
  }
  const uninitializedFiber = createHostRootFiber(tag);
  root.current = uninitializedFiber;
  uninitializedFiber.stateNode = root;

  return root;
}

function FiberRootNode(containerInfo, tag, hydrate) {
  this.tag = tag;
  this.current = null;
  this.containerInfo = containerInfo;
  this.pendingChildren = null;
  this.pingCache = null;
  this.finishedExpirationTime = NoWork;
  this.finishedWork = null;
  this.timeoutHandle = noTimeout;
  this.context = null;
  this.pendingContext = null;
  this.hydrate = hydrate;
  this.firstBatch = null;
  this.callbackNode = null;
  this.callbackExpirationTime = NoWork;
  this.firstPendingTime = NoWork;
  this.lastPendingTime = NoWork;
  this.pingTime = NoWork;

  if (enableSchedulerTracing) {
    this.interactionThreadID = unstable_getThreadID();
    this.memoizedInteractions = new Set();
    this.pendingInteractionMap = new Map();
  }
  if (enableSuspenseCallback) {
    this.hydrationCallbacks = null;
  }
}

export function createHostRootFiber(tag: RootTag): Fiber {
  let mode;
  if (tag === ConcurrentRoot) {
    mode = ConcurrentMode | BatchedMode | StrictMode;
  } else if (tag === BatchedRoot) {
    mode = BatchedMode | StrictMode;
  } else {
    mode = NoMode;
  }
  if (enableProfilerTimer && isDevToolsPresent) {
    // Always collect profile timings when DevTools are present.
    // This enables DevTools to start capturing timing at any point–
    // Without some nodes in the tree having empty base times.
    mode |= ProfileMode;
  }
  return createFiber(HostRoot, null, null, mode);
}

const createFiber = function(
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode,
): Fiber {
  // $FlowFixMe: the shapes are exact here but Flow doesn't like constructors
  return new FiberNode(tag, pendingProps, key, mode);
};

function FiberNode(
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode,
) {
  // Instance
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;

  // Fiber
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;

  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;

  this.mode = mode;

  // Effects
  this.effectTag = NoEffect;
  this.nextEffect = null;

  this.firstEffect = null;
  this.lastEffect = null;

  this.expirationTime = NoWork;
  this.childExpirationTime = NoWork;

  this.alternate = null;

  if (enableProfilerTimer) {
    // Note: The following is done to avoid a v8 performance cliff.
    //
    // Initializing the fields below to smis and later updating them with
    // double values will cause Fibers to end up having separate shapes.
    // This behavior/bug has something to do with Object.preventExtension().
    // Fortunately this only impacts DEV builds.
    // Unfortunately it makes React unusably slow for some applications.
    // To work around this, initialize the fields below with doubles.
    //
    // Learn more about this here:
    // https://github.com/facebook/react/issues/14365
    // https://bugs.chromium.org/p/v8/issues/detail?id=8538
    this.actualDuration = Number.NaN;
    this.actualStartTime = Number.NaN;
    this.selfBaseDuration = Number.NaN;
    this.treeBaseDuration = Number.NaN;

    // It's okay to replace the initial doubles with smis after initialization.
    // This won't trigger the performance cliff mentioned above,
    // and it simplifies other profiler code (including DevTools).
    this.actualDuration = 0;
    this.actualStartTime = -1;
    this.selfBaseDuration = 0;
    this.treeBaseDuration = 0;
  }

  // This is normally DEV-only except www when it adds listeners.
  // TODO: remove the User Timing integration in favor of Root Events.
  if (enableUserTimingAPI) {
    this._debugID = debugCounter++;
    this._debugIsCurrentlyTiming = false;
  }
}

export function updateContainer(
  element: ReactNodeList,
  container: OpaqueRoot,
  parentComponent: ?React$Component<any, any>,
  callback: ?Function,
): ExpirationTime {
  const current = container.current;
  const currentTime = requestCurrentTime();

  const suspenseConfig = requestCurrentSuspenseConfig();
  const expirationTime = computeExpirationForFiber(
    currentTime,
    current,
    suspenseConfig,
  );
  return updateContainerAtExpirationTime(
    element,
    container,
    parentComponent,
    expirationTime,
    suspenseConfig,
    callback,
  );
}

export function computeExpirationForFiber(
  currentTime: ExpirationTime,
  fiber: Fiber,
  suspenseConfig: null | SuspenseConfig,
): ExpirationTime {
  const mode = fiber.mode;
  if ((mode & BatchedMode) === NoMode) {
    return Sync;
  }
  const priorityLevel = getCurrentPriorityLevel();
  if ((mode & ConcurrentMode) === NoMode) {
    return priorityLevel === ImmediatePriority ? Sync : Batched;
  }
  if ((executionContext & RenderContext) !== NoContext) {
    // Use whatever time we're already rendering
    return renderExpirationTime;
  }
  let expirationTime;
  if (suspenseConfig !== null) {
    // Compute an expiration time based on the Suspense timeout.
    expirationTime = computeSuspenseExpiration(
      currentTime,
      suspenseConfig.timeoutMs | 0 || LOW_PRIORITY_EXPIRATION,
    );
  } else {
    // Compute an expiration time based on the Scheduler priority.
    switch (priorityLevel) {
      case ImmediatePriority:
        expirationTime = Sync;
        break;
      case UserBlockingPriority:
        // TODO: Rename this to computeUserBlockingExpiration
        expirationTime = computeInteractiveExpiration(currentTime);
        break;
      case NormalPriority:
      case LowPriority: // TODO: Handle LowPriority
        // TODO: Rename this to... something better.
        expirationTime = computeAsyncExpiration(currentTime);
        break;
      case IdlePriority:
        expirationTime = Never;
        break;
      default:
        invariant(false, 'Expected a valid priority level');
    }
  }

  // If we're in the middle of rendering a tree, do not update at the same
  // expiration time that is already rendering.
  // TODO: We shouldn't have to do this if the update is on a different root.
  // Refactor computeExpirationForFiber + scheduleUpdate so we have access to
  // the root when we check for this condition.
  if (workInProgressRoot !== null && expirationTime === renderExpirationTime) {
    // This is a trick to move this update into a separate batch
    expirationTime -= 1;
  }

  return expirationTime;
}

export function updateContainerAtExpirationTime(
  element: ReactNodeList,
  container: OpaqueRoot,
  parentComponent: ?React$Component<any, any>,
  expirationTime: ExpirationTime,
  suspenseConfig: null | SuspenseConfig,
  callback: ?Function,
) {
  // TODO: If this is a nested container, this won't be the root.
  const current = container.current;

  const context = getContextForSubtree(parentComponent);
  if (container.context === null) {
    container.context = context;
  } else {
    container.pendingContext = context;
  }

  return scheduleRootUpdate(
    current,
    element,
    expirationTime,
    suspenseConfig,
    callback,
  );
}

function scheduleRootUpdate(
  current: Fiber,
  element: ReactNodeList,
  expirationTime: ExpirationTime,
  suspenseConfig: null | SuspenseConfig,
  callback: ?Function,
) {
  const update = createUpdate(expirationTime, suspenseConfig);
  // Caution: React DevTools currently depends on this property
  // being called "element".
  update.payload = {element};

  callback = callback === undefined ? null : callback;
  if (callback !== null) {
    warningWithoutStack(
      typeof callback === 'function',
      'render(...): Expected the last optional `callback` argument to be a ' +
        'function. Instead received: %s.',
      callback,
    );
    update.callback = callback;
  }

  enqueueUpdate(current, update);
  scheduleWork(current, expirationTime);

  return expirationTime;
}

export function scheduleUpdateOnFiber(
  fiber: Fiber,
  expirationTime: ExpirationTime,
) {
  checkForNestedUpdates();
  warnAboutInvalidUpdatesOnClassComponentsInDEV(fiber);

  const root = markUpdateTimeFromFiberToRoot(fiber, expirationTime);
  if (root === null) {
    warnAboutUpdateOnUnmountedFiberInDEV(fiber);
    return;
  }

  root.pingTime = NoWork;

  checkForInterruption(fiber, expirationTime);
  recordScheduleUpdate();

  // TODO: computeExpirationForFiber also reads the priority. Pass the
  // priority as an argument to that function and this one.
  const priorityLevel = getCurrentPriorityLevel();

  if (expirationTime === Sync) {
    if (
      // Check if we're inside unbatchedUpdates
      (executionContext & LegacyUnbatchedContext) !== NoContext &&
      // Check if we're not already rendering
      (executionContext & (RenderContext | CommitContext)) === NoContext
    ) {
      // Register pending interactions on the root to avoid losing traced interaction data.
      schedulePendingInteractions(root, expirationTime);

      // This is a legacy edge case. The initial mount of a ReactDOM.render-ed
      // root inside of batchedUpdates should be synchronous, but layout updates
      // should be deferred until the end of the batch.
      let callback = renderRoot(root, Sync, true);
      while (callback !== null) {
        callback = callback(true);
      }
    } else {
      scheduleCallbackForRoot(root, ImmediatePriority, Sync);
      if (executionContext === NoContext) {
        // Flush the synchronous work now, unless we're already working or inside
        // a batch. This is intentionally inside scheduleUpdateOnFiber instead of
        // scheduleCallbackForFiber to preserve the ability to schedule a callback
        // without immediately flushing it. We only do this for user-initiated
        // updates, to preserve historical behavior of sync mode.
        flushSyncCallbackQueue();
      }
    }
  } else {
    scheduleCallbackForRoot(root, priorityLevel, expirationTime);
  }

  if (
    (executionContext & DiscreteEventContext) !== NoContext &&
    // Only updates at user-blocking priority or greater are considered
    // discrete, even inside a discrete event.
    (priorityLevel === UserBlockingPriority ||
      priorityLevel === ImmediatePriority)
  ) {
    // This is the result of a discrete event. Track the lowest priority
    // discrete update per root so we can flush them early, if needed.
    if (rootsWithPendingDiscreteUpdates === null) {
      rootsWithPendingDiscreteUpdates = new Map([[root, expirationTime]]);
    } else {
      const lastDiscreteTime = rootsWithPendingDiscreteUpdates.get(root);
      if (lastDiscreteTime === undefined || lastDiscreteTime > expirationTime) {
        rootsWithPendingDiscreteUpdates.set(root, expirationTime);
      }
    }
  }
}