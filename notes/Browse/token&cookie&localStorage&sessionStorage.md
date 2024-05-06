## token
Token是一种无状态认证形式，客户端拥有一个令牌，通常是一串字符串，用于认证向服务器的请求。Token不要求服务器跟踪用户的状态，因为所有必要的信息都编码在令牌本身中。

### JWT (JSON Web Token)
JWT是一种紧凑、安全的表示双方之间传输声明的方法。JWT是一个包含头部、负载和签名的JSON对象。JWT可用于认证和授权用户，它们是自包含的，意味着验证它们所需的所有信息都包含在令牌本身中。

**例如**： 开发人员创建了一个具有单点登录功能的Web应用程序。用户登录后，服务器生成一个包含用户身份和权限的JWT。这个JWT发送给客户端并存储在本地。当用户想要访问受保护的资源时，客户端在HTTP请求的Authorization头部中包含JWT。服务器验证JWT，如果有效，则授予资源访问权限。

JWT（JSON Web Token）是一种用于身份验证和授权的开放标准（RFC 7519），它可以在网络上安全地传输声明。JWT通常由三部分组成：头部（Header）、载荷（Payload）、签名（Signature），它们使用点号（.）分隔开来，形成一个字符串。

1. **头部（Header）**：头部通常由两部分组成，令牌的类型（即JWT）和所用的签名算法（如HMAC SHA256或RSA）。头部是一个包含这些信息的JSON对象，通常看起来像这样：

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

2. **载荷（Payload）**：载荷包含声明，它们是关于实体（通常是用户）和其他数据的声明。载荷分为三种类型：注册声明、公共声明和私有声明。载荷是一个包含这些信息的JSON对象，通常看起来像这样：

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

3. **签名（Signature）**：签名是使用头部指定的算法对令牌进行签名的部分。签名用于验证消息的完整性，以确保接收方能够验证发件人的身份，并且可以确保消息在传输过程中没有被篡改。签名通常包含用于生成签名的头部编码和载荷编码以及秘钥。签名的生成过程是将头部和载荷分别进行Base64编码，然后用点号连接起来，再使用指定的算法和秘钥进行签名生成。

JWT的格式如下：

```
xxxxx.yyyyy.zzzzz
```

其中：
- `xxxxx` 是 Base64 编码后的头部
- `yyyyy` 是 Base64 编码后的载荷
- `zzzzz` 是签名

要生成JWT，你可以使用特定的库或工具来进行操作，例如Node.js中的`jsonwebtoken`库。下面是一个使用Node.js的`jsonwebtoken`库生成JWT的示例：

```javascript
const jwt = require('jsonwebtoken');

// 秘钥
const secretKey = 'your_secret_key';

// 载荷
const payload = {
  sub: '1234567890',
  name: 'John Doe',
  admin: true
};

// 生成JWT
const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

console.log(token);
```

这将生成一个包含指定载荷的JWT，其有效期为1小时。
## cookie

Cookie是存储在客户端（用户浏览器）的小块数据，可以用来记住用户的相关信息，例如登录凭证或偏好设置。它们随每个HTTP请求发送给服务器，并且可以被服务器读取以维持会话或个性化用户体验。

**例如：** 想象用户登录银行网站。服务器创建一个包含会话标识符的Cookie，并通过Set-Cookie头部发送回用户的浏览器。浏览器存储此Cookie，并在随后的请求中将其发送回服务器，允许服务器识别用户并在多个页面加载中保持他们的登录状态。

Cookie 是最早被提出来的本地存储方式，在此之前，服务端是无法判断网络中的两个请求是否
是同一用户发起的，为解决这个问题，Cookie 就出现了。Cookie 的大小只有 4kb，它是一种纯文本文件，每次发起HTTP请求都会携带Cookie。

Cookie的特性：
- Cookie 一旦创建成功，名称就无法修改
- Cookie 是无法跨域名的，也就是说 a 域名和 b 域名下的 cookie 是无法共享的，这也是由Cookie 的隐私安全性决定的，这样就能够阻止非法获取其他网站的 Cookie
- 每个域名下 Cookie 的数量不能超过 20 个，每个 Cookie 的大小不能超过 4kb
- 有安全问题，如果 Cookie 被拦截了，那就可获得 session 的所有信息，即使加密也于事无
补，无需知道 cookie 的意义，只要转发 cookie 就能达到目的
- Cookie 在请求一个新的页面的时候都会被发送过去

如果需要域名之间跨域共享 Cookie，有两种方法：
1. 使用 Nginx 反向代理
2. 在一个站点登陆之后，往其他网站写 Cookie。服务端的 Session 存储到一个节点，Cookie存储sessionId

Cookie 的使用场景：

- 最常见的使用场景就是Cookie和session结合使用，我们将sessionId存储到Cookie中，每次发请求都会携带这个sessionId，这样服务端就知道是谁发起的请求，从而响应相应的信息。
- 可以用来统计页面的点击次数
## localStorage
## sessionStorage