angular.module('ideRepository', [])
    .provider('repositoryApi', function RepositoryApiProvider() {
        this.repositoryServiceUrl = '/services/v4/core/repository';
        this.$get = ['$http', function repositoryApiFactory($http) {
            let getMetadata = function (resourceUrl) {
                return $http.get(resourceUrl, { headers: { 'describe': 'application/json' } })
                    .then(function successCallback(response) {
                        return { status: response.status, data: response.data };
                    }, function errorCallback(response) {
                        console.error('Repository service:', response);
                        return { status: response.status };
                    });
            }

            let loadRepository = function (resourcePath = '/') {
                let url = new UriBuilder().path(this.repositoryServiceUrl.split('/')).path(resourcePath.split('/')).build();
                return $http.get(url, { headers: { 'describe': 'application/json' } })
                    .then(function successCallback(response) {
                        return { status: response.status, data: response.data };
                    }, function errorCallback(response) {
                        console.error('Repository service:', response);
                        return { status: response.status };
                    });
            }.bind(this);

            let createCollection = function (path, name) {
                let url = new UriBuilder().path(this.repositoryServiceUrl.split('/')).path(path.split('/')).path(name).build() + '/';
                return $http.post(url)
                    .then(function successCallback(response) {
                        return { status: response.status, data: response.config.url };
                    }, function errorCallback(response) {
                        console.error('Repository service:', response);
                        return { status: response.status };
                    });
            }.bind(this);

            let createResource = function (path, name) {
                let url = new UriBuilder().path(this.repositoryServiceUrl.split('/')).path(path.split('/')).path(name).build();
                return $http.post(url)
                    .then(function successCallback(response) {
                        return { status: response.status, data: response.config.url };
                    }, function errorCallback(response) {
                        console.error('Repository service:', response);
                        return { status: response.status };
                    });
            }.bind(this);

            return {
                getMetadata: getMetadata,
                load: loadRepository,
                createCollection: createCollection,
                createResource: createResource,
            };
        }];
    });