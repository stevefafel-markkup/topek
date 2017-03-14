import { NavigationActions } from "react-navigation"

function recursiveFindRoute(route, name) {
  if (!route) {
    return null;
  }
  else if (route.routeName == name) {
    return route;
  }
  else if (!route.routes) {
    return null;
  }
  else {
    for (var i=0; i<route.routes.length; i++) {
      var found = recursiveFindRoute(route.routes[i], name);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

export function findRouteKey(state, name) {
  var found = recursiveFindRoute(state.nav, name);
  if (found) {
    return found.key;
  }
  return null;
}

export function dismissModal(modalRouteName) {
  return async (dispatch, getState) => {
    var modalKey = findRouteKey(getState(), modalRouteName);
    if (modalKey) {
      dispatch(NavigationActions.back({key: modalKey}));
    }
  }
}