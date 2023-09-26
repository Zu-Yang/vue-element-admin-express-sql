// 组件样式
import "codemirror/lib/codemirror.css";
// theme主题样式，根据设置的theme的主题引入 只预设了一下四种主题:3024-day ayu-mirage monokai rubyblue
import "codemirror/theme/3024-day.css";
import "codemirror/theme/ayu-mirage.css";
import "codemirror/theme/monokai.css";
import 'codemirror/theme/rubyblue.css';

/* script-loader@0.7.2、jsonlint@1.6.3 语法检验需要装这两个插件 */
require('script-loader!jsonlint')
import 'codemirror/addon/lint/json-lint'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/lint.css'

// html代码高亮
import "codemirror/mode/htmlmixed/htmlmixed.js";
// mode语言模式
import 'codemirror/mode/javascript/javascript.js';

// 折叠
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/comment-fold'
