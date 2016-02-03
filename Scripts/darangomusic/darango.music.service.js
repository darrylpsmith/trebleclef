/*global angular */

(function () {
	"use strict";

	angular.module("darangoMusic").factory("darangoMusicService", DarangoMusicService);

	/** @ngInject */
	function DarangoMusicService($rootScope, $q) {

		//var _folders = [];
		//var _documents = [];

		var service = {};
		service.getMusicNoteSharps = getMusicNoteSharps;
		//service.deleteFolder = deleteFolder;

		return service;

		function getMusicNoteSharps(reportStorageScope) {
			var Uri = 'MusicNoteSharps.html';
			return $http({
				method: 'GET',
				url: Uri
			});
		};

		//function deleteFolder(folderId) {
		//	return reportApiService.deleteFolder(folderId)
		//		.then(function (result) {
		//			return $q.when();
		//		});

		//}

		//function deleteDocument(documentId) {
		//	return reportApiService.deleteDocument(documentId, service.reportStorageScope)
		//		.then(function (result) {
		//			return $q.when();
		//		});

		//}
		//function getMusicNoteSharps() {
		//	return reportApiService.getFolderNamesIdandIsLocked(parentfolderID, service.reportStorageScope)
		//	.then(function (result) {
		//		_folders = result.data;

		//		return $q.when(_folders);
		//	});
		//}





	}
})();