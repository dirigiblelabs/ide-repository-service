angular.module('ideRepository', [])
    .provider('repositoryApi', function RepositoryApiProvider() {
        this.repositorysServiceUrl = '';
        this.$get = ['$http', function repositoryApiFactory($http) {
            return {};
        }];
    });