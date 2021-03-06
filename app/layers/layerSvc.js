"use strict";

function layerSvc(stateSvc) {
  const svc = {};

  svc.baseLayers = [
    {
      title: "World Light",
      type: "MapBox",
      name: "world-light"
    },
    {
      title: "Geography Class",
      type: "MapBox",
      name: "geography-class"
    },
    {
      title: "Natural Earth 2",
      type: "MapBox",
      name: "natural-earth-2"
    },
    {
      title: "Natural Earth",
      type: "MapBox",
      name: "natural-earth-1"
    },
    {
      title: "Humanitarian OpenStreetMap",
      type: "HOT",
      name: "hot"
    },
    {
      title: "OpenStreetMap",
      type: "OSM",
      name: "osm"
    },
    {
      title: "World Topo Map",
      type: "ESRI",
      name: "world-topo-map"
    },
    {
      title: "No background",
      type: "None"
    }
  ];

  svc.removeLayer = lyr => {
    stateSvc.removeLayer(lyr.values_.uuid);
    window.storyMap.removeStoryLayer(lyr);
  };

  svc.toggleVisibleLayer = lyr => {
    window.storyMap.toggleStoryLayer(lyr);
  };

  svc.compileLayerNamesFromSearchIndex = searchIndex => {
    const names = [];
    for (let i = 0; i < searchIndex.length; i += 1) {
      if (searchIndex[i].title) {
        names.push(searchIndex[i].title);
      } else {
        names.push(searchIndex[i].typename);
      }
    }
    return names;
  };

  svc.getNameFromIndex = (layerName, nameIndex) => {
    let name;
    for (let i = 0; i < nameIndex.length; i++) {
      if (
        nameIndex[i].title.trim() === layerName.trim() ||
        nameIndex[i].typename === layerName
      ) {
        name = nameIndex[i].typename;
      }
    }
    return name;
  };

  svc.handleAddLayerError = problems => {
    let msg = "Something went wrong:";
    if (problems[0].status == 404) {
      msg = "Cannot find the specified layer: ";
    } else {
      msg += problems[0].data;
    }
    $log.warn("Failed to load %s because of %s", scope.layerName, problems);
  };

  return svc;
}

module.exports = layerSvc;
