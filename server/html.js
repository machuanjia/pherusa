/** @format */

const { entrypoints } = require('../dist/asset-manifest.json')

function getFileExt(filename) {
    return filename.split('.').pop()
}

const scriptStr = file => `<script src="${file}"></script>`
const linkStr = file => `<link href="${file}" rel="stylesheet"/>`

/**
 * 获取 HTML 字符串
 */
exports.getHtmlByConfig = function (configString) {
    // ico
    const icon = `<link href="https://cdn.wul.ai/official/img/favicon.ico" rel="icon" as="image">`

    // 标题
    const title = '来也科技 - 合作伙伴专区'

    // 第三方
    const extJs = [
        'https://cdn.wul.ai/official/publicStatic/jquery.js',
        'https://cdn.wul.ai/official/publicStatic/officialPublic.js',
    ]
        .map(file => scriptStr(file))
        .join('')
    const extCss = ['https://cdn.wul.ai/official/publicStatic/officialPublic.css'].map(file => linkStr(file)).join('')

    const prefix = '/pherusa/'
    // React
    const reactJs = entrypoints
        .filter(file => getFileExt(file) === 'js')
        .map(file => scriptStr(prefix + file))
        .join('')
    const reactCss = entrypoints
        .filter(file => getFileExt(file) === 'css')
        .map(file => linkStr(prefix + file))
        .join('')

    return `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,height=device-height,inital-scale=1.0,maximum-scale=1.0,user-scalable=no;"/><meta name="keywords" content="人工智能,智能机器人,智能客服,聊天机器人,自然语言处理,人机对话,语义理解,语义分析,Chatbot,来也网络,吾来,小来,助理来也,人工智能客服,汪冠春,胡一川, RPA, UiBot, RPA+AI, AI, 机器人流程自动化, 人机协同"/><meta name="description" content="来也科技创办于2015年，由常春藤盟校（Ivy League）机器学习博士团队发起，致力于做人机共生时代具备全球影响力的智能机器人公司。核心技术涵盖深度学习、强化学习、机器人流程自动化（RPA）、自然语言处理（NLP）、个性化推荐和多轮多模交互等。公司已获得数十项专利和国家高新技术企业认证。"/>${icon}<title>${title}</title>${extCss}${reactCss}</head><body><div id="root"></div><script>window.APP_CONFIGRATION=${configString}</script>${extJs}${reactJs}</script></body></html>`
}
