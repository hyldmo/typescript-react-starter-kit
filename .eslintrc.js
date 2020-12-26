const enabled = 'error' // Used to set error level across rules

module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true,
        jasmine: true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module'
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    rules: {
        '@typescript-eslint/array-type': [enabled, {
            default: 'array-simple'
        }],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/member-delimiter-style': [enabled, {
            multiline: {
                delimiter: 'none',
                requireLast: true
            },
            singleline: {
                delimiter: 'comma',
                requireLast: false
            }
        }],
        '@typescript-eslint/member-ordering': enabled,
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/prefer-for-of': enabled,
        '@typescript-eslint/prefer-function-type': enabled,
        '@typescript-eslint/quotes': [enabled,
            'single',
            {
                avoidEscape: true
            }
        ],
        '@typescript-eslint/semi': [enabled, 'never'],
        '@typescript-eslint/unified-signatures': enabled,
        'arrow-body-style': enabled,
        'arrow-parens': ['off',
            'as-needed'
        ],
        'camelcase': enabled,
        'comma-dangle': enabled,
        'constructor-super': enabled,
        'dot-notation': enabled,
        'eol-last': enabled,
        'guard-for-in': enabled,
        'id-blacklist': [enabled,
            'any',
            'number',
            'String',
            'string',
            'Boolean',
            'boolean'
        ],
        'id-match': enabled,
        'import/no-extraneous-dependencies': 'off',
        'import/no-internal-modules': 'off',
        'sort-imports': [enabled, {
            ignoreCase: true,
            ignoreDeclarationSort: true
        }],
        'linebreak-style': [enabled,
            'unix'
        ],
        'max-classes-per-file': [enabled,
            1
        ],
        'max-len': [enabled, {
            code: 180
        }],
        'new-parens': enabled,
        'no-bitwise': enabled,
        'no-caller': enabled,
        'no-cond-assign': enabled,
        'no-console': 'off',
        'no-debugger': enabled,
        'no-duplicate-case': enabled,
        'no-duplicate-imports': enabled,
        'no-empty': enabled,
        'no-eval': enabled,
        'no-extra-bind': enabled,
        'no-fallthrough': 'off',
        'no-invalid-this': 'off',
        'no-multiple-empty-lines': [enabled, {
            max: 1
        }],
        'no-new-func': enabled,
        'no-new-wrappers': enabled,
        'no-redeclare': enabled,
        'no-return-await': enabled,
        'no-sequences': enabled,
        'no-shadow': [enabled, {
            hoist: 'all'
        }],
        'no-sparse-arrays': enabled,
        'no-template-curly-in-string': enabled,
        'no-throw-literal': enabled,
        'no-trailing-spaces': enabled,
        'no-undef-init': enabled,
        'no-unsafe-finally': enabled,
        'no-unused-vars': 'off',
        'object-shorthand': enabled,
        'one-var': [enabled,
            'never'
        ],
        'prefer-arrow-callback': enabled,
        'prefer-object-spread': enabled,
        'prefer-template': enabled,
        'quote-props': [enabled,
            'consistent-as-needed'
        ],
        'radix': enabled,
        'react/prop-types': 'off',
        'space-before-function-paren': [enabled,
            'always'
        ],
        'space-in-parens': enabled,
        'spaced-comment': enabled,
        'use-isnan': enabled,
        'valid-typeof': 'off'
    }
}
