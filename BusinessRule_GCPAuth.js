/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "GCPAuth",
  "type" : "BusinessFunction",
  "setupGroups" : [ "GCPPublish" ],
  "name" : "GCPAuth",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessFunctionWithBinds",
  "binds" : [ {
    "contract" : "GatewayBinding",
    "alias" : "giep",
    "parameterClass" : "com.stibo.core.domain.impl.integrationendpoint.gateway.FrontGatewayIntegrationEndpointImpl",
    "value" : "PubSubTest",
    "description" : null
  }, {
    "contract" : "SecretBindContract",
    "alias" : "jwt",
    "parameterClass" : "com.stibo.passwordparameter.PasswordParameter",
    "value" : "eRAjNzxQJ81jAUVjF4v9QLDxc7JTtjoaCJ0nrUNYCLvh0oLWnnbxjHIpS/BrT2BrslJgUUhku6U9ONqx0X9aHIgV/QXgXM9xzL89TDcGecN8lxn0yYWsDnwMJYxYNnNDsqrMQNRcWyUV/10HE+SXL04+vUiTjYJJIztBv/KQT4biIHG4pqZO9sZUrvjKSHgm2r+Hukpaa0v1g4uGhmzRvIXI5IKxXPpXJheBqLNchQm/3LuhgShjZ+FZZ6NRYzQBj2nVHF3freaKvXZUb2ezmgZgtwErbKGU+ptfZnToFuIVLXY+AeAJEoQsyqa+AlZAzCRvuQ+2TyUTy5TeakvOBIFVzAXQ5UwLkd1Rfp4PQMt9qEnRHzkt8oi4FhDdK5tmdncsehMv8BWShtZoaxmlCGhE8CmEsgVpuXGGAljVftbvu4PtGOQ7vhbRvdO3cR2+ZjGRlWv1PAbaTNOgc5D7DlYD/biaquaGYTtMQtei30TES1YL1rlFl77UM/4Z8J5KtFwMdHu/RgPFuOySCAWKEA0A20osEjvbEZ3sBmRv58ocngTyFQq0yzhnD65+EOKRP2V6Ooz2IR82q/RBaYW5/XZHpoxYgyYcQ1FLeRwvkwRNHqwS/3PAc+E03pz3cAf+OlOaUL4gPWaS3tdDdrlARo4UZSod5gub4e1JCPKxWfeCKg1Xg7ZTwlnc/loc+ovoV3HMVluvuSHgydiVioMv3Td5RDy8BIzGA8fpAXzxvEsV4PQ9/hBlVC00b0w/n7cloClSRm8ACm+9Yin/LFALvucXuLd26EQshIKEIw0I6isyPlL4kK1DhRzTlN3KnubF1XINkn6a7SWjIzYFdO3FJlB19sHq+rZMwgJWuK8eEwTBelE6bAMMFzD0Pwlj3e28A0CpFqipcRejfxUBHwkuVk3RhgTTu/v1lleDs+82EajQwmoPurF/F1/cOJ1rt+eIfsro2R4zwB3JvD4r64i0SsYPcmWEtlpqdB0chehHJ41clSbJp1h94rqkveW3hTxmBl492taUv+ZWc5AhB5b5RgZWqpvzpO0Cu+euETLUqzaQtCGaF9SaZ35obdByNoC0i4sNNfPEc9KmZhmDlOclRIndJCn+xbcvCNB56o7EWktjbe6j1IhYG+quWU80JlX6/XMYTf+YX3uSgY/8mlFm0Ys8RrVeMvfoW/LIMeMrfeyzaFxdAFXZl/tFaKRzsnRRO0oxqqVcNWi4uB9HqQcrTDE6Cupo3vr1BdTY5EIQzQt6VEtz/pQJpreFS6ifkf6YB3P/GGa+/t4D15LhH9eWlq44GHfCLn/Gu9w9vk+bgVAd4oPTA9N79aW+IGRipkjbTLNBL3krU5KNJeJB/OIAAicQyrNIwC2P1PHZJLa27XiWFl7GlDT9eOkSnrF0FMAexVHsQUACsKoLW7w38gLxuUT637ybWOT7ckDJ+H4DSTKlXhnou7NU9tGO+44bZYGFqDQOa7O4DwCMqaHpBn+tNnLzDT0oF4UjMCNj9+JKsVWZki9E9QukrNt9AtnoaQIiqS2EKS0S0Qf6/Z7w5NqEKcn1/fzPQ9gCvTA2+aQTX5epUP9oTrbbakX8a5D9LPNK6ytrn3a1DwD35PnuDA5Jh8pj0AG5uM0lZ4BsZQ913P7puESn5XWStjbTxozNyT02LcC2vgzy5GnIPWbZLmAqrlRHiKL6962Rgbur69KIjpMUb552m2MPrmKVxJwD9PK/S1kozH0BglKa4VT0dNOxchQcwqy1oSs34t1rIXpAkg6wZfO0NjX5OUCHDclQIh6rjToYEwkrQvj2wpf50hK8XJE9BMci0eehj4k/cbeZxWc/eTpRCPGWzOdb8Sb9KmTU8KTR+A/170ABCqiCOiGXatSc1R9YZJZ1A85X0Op5VowI12Y50udmshmBi8nTRSlAekgRNY3FhKYR2ymTYrh3+RAhdDlprX25b5+OYOK6YwrcVIpQht/ens2vT7cGTKsd32RZS93ZyZEL17vfd7ZM9J91pB48fKLiEeSpjdIAwJd/fzcE/rGPbrzN8m8Ho1G0sFICNeleSLrozIXMzwcg7LproAyRFQSoUnN85N5aDU+gzKK0HXzbAvoM6gv7+NeQdttFgbCAafvpC3wueKC6rK7HcGxpOWHEFoCgTVGVjgKJlKdt28MWnMhQ85p8u63LixBJYyJkbG3gYjsoyaKC52CNSmv5vd6/uKgtk8GtU4MlLzd+rV2AZZ1aPQ+cxh3QCbb2kRgpMvOBkvpsi+sLqTZnPHrUbGFFmF6inFgVW/TmffJ5BGhmMqdp7kfuaIkAqd46rx/WzDexVtBcnNjUo4C+X5/luiBcz4Fxey8QTzm4RiwcrYBtt1241udbfqYve3AOCCh8tIKJD6SBge2YbV63ysdQpxrpyPWO6waZGTUU1YRHZpgVkuxGu+sIoKMdRcsWCrGPluaksDMb2MDZsQfXA7ZpyuJM9kTmmiq7y6h4qtxss2l/y2MoLWzoMh5AxuhMGTWcMmCdS+GlN7ZRaoOP5QvAf4Qe79jzWtd9gc1842K4r6Kx1tD0pwbL5oF2o33VtZSuNxZLEEs5ligIfaae3HRmxLSKtMAiBbcV8/ivYg8YM3gaOJ+XAJ87n9T40VBMeMnJwCW93+VjSAexqo2BEhDPyKjLkdwoZTQNUG3NkSlcQ6sMMV6+B67X/jBP6pQVkwJ1kzbI1v7c/4aDqhno3sNq0Pg1lVdFHeQ5O8WK1jr53aQ+45Wmms1E1oqEtRWWyfyhUu4trCHZhZpd+UD1lpCJqb+JIXwixq8dBgyjXqBi5UQRvPFWGTu0ihGoKg4Fx7S4bMtzbvEp/19zSqzMDi0dc+76wgq/3Ma+rSk989Zk8a041gAoWQqUCEMUaeovZhuZoJnquD4nmbuZRQ6ENWQvTBflJEK/D5Gcn1sSFitjRThYLA1DEMvQA57sc4NIeJwZrnB5eCmLtkD2xE5j/fYKKOA+8UjQJFUmHBNBVSPsEasxbQYT9Ije9HGER+gh1/yF/rAZuilNOHd6va1bZheIAHQeu3A9vDtutXC1SgnJaY9pD7xY8pmS9o2bA3nhIyodtC/v2DJp5fAibDj3Vl8eRSbsTLvaM2MzzrRwI+K17wMmhg11oPIl62cCIyEttD+smvLVo2vRcXBhqV6cYT50qirtEas8MEhXogkBesm2aS8mSx51/ViHlhdFHNKGi20EOKB+W9C4oWYLSynOXOn8n5ag51y8mUVW/XE=",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "java.util.Map<java.lang.String, java.lang.String>",
  "functionParameterBinds" : [ ]
}
*/
exports.operation0 = function (giep,jwt) {

}