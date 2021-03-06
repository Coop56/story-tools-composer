describe("mapManager", () => {
  let rootScope, location, MapManager, $httpBackend, q, stateSvc;

  beforeEach(module("composer"));
  beforeEach(
    inject(($rootScope, $location, $q, _MapManager_, _stateSvc_, _$httpBackend_) => {
      q = $q;
      $httpBackend = _$httpBackend_;
      stateSvc = _stateSvc_;
      MapManager = _MapManager_;
      rootScope = $rootScope.$new();
      location = $location;
    })
  );

  describe("getDataFromLocalServer", () => {
    it("should return a promise", () => {
      const promise = MapManager.getDataFromLocalServer(15, "annotations").then;
      expect(promise).toBeDefined();
    });

    it("should return `error` if endpoint doesn't exist", () => {
      let res;
      $httpBackend.whenGET("/maps/15/annotations").respond(404);
      MapManager.getDataFromLocalServer(15, "annotations").then(_res_ => {
        res = _res_;
      });
      $httpBackend.flush();
      expect(res).toBe("error");
    });

    it("should return `error` if endpoint doesn't exist", () => {
      let res;
      $httpBackend.whenGET("/maps/15/annotations").respond(404);
      MapManager.getDataFromLocalServer(15, "annotations").then(_res_ => {
        res = _res_;
      });
      $httpBackend.flush();
      expect(res).toBe("error");
    });
  });

  describe("loadMap", () => {
    it("should call `loadMapFromID`", () => {
      const loadMapFromIDSpy = spyOn(
        MapManager,
        "loadMapFromID"
      ).and.callThrough();
      MapManager.loadMap(stateSvc.getChapterConfig());
      expect(loadMapFromIDSpy).toHaveBeenCalled();
    });
  });
});
