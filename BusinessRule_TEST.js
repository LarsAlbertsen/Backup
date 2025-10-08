/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "TEST",
  "type" : "BusinessAction",
  "setupGroups" : [ "GCPPublish" ],
  "name" : "TEST",
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
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "atg",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>AccessTokenGetter</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "SecretBindContract",
    "alias" : "jwt",
    "parameterClass" : "com.stibo.passwordparameter.PasswordParameter",
    "value" : "eRAjNzxQJ81jAUVjF4v9QO18sjygEHTDqB2GWeMHnX4Cp+brUiUuUq09ajfBAXlEen0QrygI/CK20BamFve7zdHwYodfz4Fu6qJ/ru36mTET8pAfnOHxjj2Pn0VclbNroFSrvbLqmNHHcD59QkZxtCV9PlL/k6gl/3/S3I0Rl81wI+K17wMmhg11oPIl62cCjgyb7HDLsJty+f3SflSGAj4iEZcy9TOaOI3QzTvJf1Ln7sRajzGPcJTbURJOlX8c03Dmkw371MED1nuZvkc6Vb0f0OvDvWKIKETISVPKvKQNypOJdmpX1yWDwU+OtcGdYXdPp/CAIkzVbDWvYskfSO+mFplGYgwegFuUvFjpa0+jB5Tx2hMNRW3X1BZQbLprlUFLuBs1aqH1Uvg+FCkKoYOP5QvAf4Qe79jzWtd9gc1jLTCMx0x8BkJEluGZ4G9oJDaugqLgvFOelzoMs1KiNScKzqCQCAmpxCh2jnfs6gDtPM1XQL9JdNV0td1PY2aPfx+hFxauFojdWNIr+/b4srcM03dyqak1ToJ/l5AC+Na8ooZCdXQEW3O5Q2x+4wpv8cqV/h+/008ssq+oEMjJeuETgs9PdhmmGLdn2tiP1A1YSTaTfYXsDx4JFk7DXRlEBQ+WeI5Kkb2cNdHdBgzerze8tNDzvBh1PZubbdj5uUHu7P/zNNIiRjwZFQvBh2UG9ZFTOjCqje93zCwnSPk4mDMn0z1yDmobLF2sYQvJ9yX6YNMjrOqcSxGKl4XqzWTSQNMsnDai5FSkefCTPmpZ80mQ6i54GSL7QOD+KQwR2tqq2JPUq4wyPRIoPAcMFOzMJxoSPzd69jQZPOkw0Uy3BtPNLcj6XW7nZLyJwuvg0wcsaJyfSnDU5aXz3uyfx3bktwwDgYrT1OLva3soMGX0v7jkOfu43UmlQaGFbs/RqHXFAJv0o0jPT/rMplgOJ/YRrF86He8XeBC5jxM+cRYTP6ld5hP+MdSz3NkT+WSpum7aBAkTEvpsvU+2mI5Sq7dN/k3Lx4A/7GacxW8mEOtEQczBhwbRZ5S3t6Z28cI6QXSg8ewkrqNqGWAfL0Cky3SryslCFhlqK3h08T1GFdmLsjmTNP7XybmN6kKZAz2Dd7m8tXjikWON84pRx4UoZ9TWxg9yZYS2Wmp0HRyF6EcnjVyVJsmnWH3iuqS95beFPGYGXj3a1pS/5lZzkCEHlvlGQgYUFerhiqOA/NQt5njdiLe7Sl/lYa8h2DKx3hOWYdnF6bl1RL+BCHUU+fBF86h/Rc001Fc8BAe/PZVuLps+yFMq+/geqHxOKjT0tXjOyGqZeW0GMlQ0pGveB19/4hbH9Hfg5M1Th/2bbpltT46H4YvxEoPUydxMg7ovdM93VLeEUyABLiNOkd8e8FPYhh/Ih9wQOBaCYLh5pMlXRP21JQYeoncZbmk0qG125XLK7thF7JHzj1vG1pt1I7GLCJ04oeDBpA5HF3vqq9yEUIKSrHvSiH7HXel1h8Ed4DRtHiEdacZO9IbUQqIa2jcOynRnANwaTLS8w0RW0czaCLTNosgvrS6UMFshE8ADjWLIUQvbKF8jkvdTg77sgpC06LlApE+ALofgnxudXzQa5qorZEV7xiyQkiA1mHYGAJ8cFNYSYly5OWc2PaWXHNaNc/YKZ1RGsQpIT2UV/maeSqCwEc8j5IDPTr3bCK28EZTj56N1fGXq2XmS5tOMClZKt1aKuzxIkvwUSRuJzfvhwodOzHBYCSUmNEyZY8fMgNvA1pI1Bmy3Ps8RxRUCv14NK6Jc/sScLUR8oKUAsy1L4FCiB51IrrluW/H4oUrJ8g51fP1vfrArcEY7GV137JgeiM+f1vlkGlfYBtwTRYOwYreYIrhjp5U4yRSqoIM14Bj2XuTW61eik+eMmPA5dqaEiCqsfuqbtpAV4SQJIQzS/sW1MvdBOV88VLRFxd7Pl/fw4b66Lh+mn9hNylOI9vughmLv3AvUI4JQ90CRved3xGYQhNRs9Lm8ftWhOvo7l9BpmC5f3myN6z4Gp6nOwj8hbkTc1HAhhJkM6RfoEG3N0/Pnm8Eopb+ms35yiKzHLFBpkzSQURfivT1tZblKu1D/VvS99tA30H4DZtHbN2JKgbC2LPhJof8CKqO3sybBvlSS5OQd+iPxUFcfgXMPh0ayEWnw5CnGR5OaWcYrk921YHWqIJHTCbBcQ+p+Z9bAQjMl0mtzmgOZeKbctlc2FhAdvgvj7S9FjYkiWsfSihOdARmgNHllz+DLVYSXu1sYc8QFGo0r4ZciVGBuwsLfBko3bNlnz76G8pWagfYUX3uSkHXJueelLFB4NdZy41jIMMcflvPsxyPbJ/DYp4kJtcq+lVoWLQF+lIY7sF4Fva6gsbD1xq9TLU0B9wVAvWotWgOjDiX+wrmTiy8ZpcL48+ZkpYkKmBy6WLa6+xc+lcoSOMGwhvkyZMk+1Momir129inUjh/CdJ8tUtPM2jlOKh7jLrGlY4weGoPSLFu1PVWUwJbTCzKHvAMHpjv/SpetHJ5ASwxURiGGIqZV6ImL8H6n2YJkGznzKAFeKXLhjRjX9c6Ejl63ysdQpxrpyPWO6waZGTUU1YRHZpgVkuxGu+sIoKMdRcsWCrGPluaksDMb2MDZsXEoAWvOdXLXj7qgK8ybU9heLKyKwkSHppV8Jqs+SAfYo0OML4P7RkhtzrBkRCs1b0Q9elaON3lL0Wyyoh5Z8L3ErRQ6urq6jJh7TqW6tQQdPiIRlzL1M5o4jdDNO8l/UoXd+0jN0AoHBVRpOjVVt4l8DZVIXNnkkxBo3fGVyUrWCypPl14xSeXEci9xYqupunOcnsfEPW5LBRUiYJXZhKbzs5jeCQaocjtRUAj2yU8cqWfs1W0gi6UCC/kqImP2X528fvh+unHqe9BYxSwN7DcqNsvw16RnLpfZeRhqDodsAH323H9ZP0DWbJxHuHAnw3pnTBN6LZuEKL0Y5eG4+TWRd84tdgT6Tz224U1szENEPiIRlzL1M5o4jdDNO8l/Ur3JNzW+nZbHAeafkbcfJJYOrf1X43lzrw/nv/K1aXphP3IcGnIVsSiYCieiG+MrrSB+zC8aVxm3DBDQgsLxiux3n68zD1kVdiUZPDeEI0Tk+SUM9GR/ifWwN73NxdPq3Lprkl0fu0IOfAHoBcPGSruI//e16UES7t3MF0sR090UwvsQfxQlupZ4bdj33rFENGBGgxGpJazaVKMCMfwuDpSQXObWGaCkwj0rGAJIgdQZHjR3vT72sk17GojXw3cDtha/YgLhOSq/hlgzQAlNxRaq7LHomLskmzD4KjuPzLZIeMA+wj7uEuflaSivIYIioUelLF5DI6LwmX4yIk01wjCdvH74frpx6nvQWMUsDew3KjbL8NekZy6X2XkYag6HbM8i7995X+11Waywce1X2NyU/+AvLtuRkr2hnGP5KHrnjxLYtcbof0oy7YgcQlvUoWJ0WMY6/zc1cQhK39xv2z7TGq5T/ynY1jpB9IrAjgRjBqaK2Wfp5vIndhwTglPSN+QVpSGF7lZi898zcDg5mmX82joY3ds2s/FH7ScU1J4F88JIxVWaEXyLfA+gc8aG15YpO3fl8TCH41nUdG1YRqOjMGW0Da22ZI9eJRWtfez+rCiOOlcpITYYeEhGfr3pRvjHbDHec/NUAsRQeTam09pAAgUg4hDoHrL0mypcewZiPiIRlzL1M5o4jdDNO8l/UocYMbKRRq46n/LPxsJqKTA=",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (logger,atg,jwt) {
logger.info(jwt)
}