/*global angular */

(function () {
	"use strict";

	angular.module("darangoMusic").controller("DarangoMusicController", DarangoMusicController);

	/** @ngInject */
	function DarangoMusicController() {
		//function DarangoMusicController($location, $q, $http, $scope, $routeParams, DarangoMusicService) {

		alert('test');
		var _this = this;
		_this.notes = [];
		_this.folders = [];
		_this.getMusicNoteSharps = getMusicNoteSharps;
		_this.errorMessage = "xxxx";
		initialize();

		function initialize() {

			_this.getMusicNoteSharps()
				.then(function (data) {
					_this.notes = data;
				});



		}



		function getMusicNoteSharps(folderId) {
			return DarangoMusicService.getMusicNoteSharps();


		}



	}
})();
