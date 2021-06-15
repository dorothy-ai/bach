import {useEffect} from 'react';
import {PROPS} from '../constants';
import {generateConditionCode} from '../util';
import {EnhancerContext, EnhancerResult, DependencyList} from '../types';

export default <T>(fn: (t: T | undefined) => unknown, conditions?: DependencyList<T>) =>
  ({generateNewVariable}: EnhancerContext): EnhancerResult => {
    const fnName = generateNewVariable();
    const conditionCode = generateConditionCode(conditions);

    return {
      dependencies: {
        useEffect,
        [fnName]: fn,
      },
      initialize: `useEffect(function () {
        return ${fnName}(${PROPS});
      }, [${conditionCode}]);`,
      props: [fnName],
    };
  };
