! function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = t || self).window = t.window || {})
}(this, function (t) {
    "use strict";

    function m(t) {
        return "string" == typeof t
    }
    var M = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
        b = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
        N = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,
        r = /(^[#\.][a-z]|[a-y][a-z])/i,
        D = Math.PI / 180,
        E = Math.sin,
        k = Math.cos,
        Q = Math.abs,
        J = Math.sqrt,
        h = function _isNumber(t) {
            return "number" == typeof t
        },
        s = function _round(t) {
            return Math.round(1e5 * t) / 1e5 || 0
        };

    function reverseSegment(t) {
        var e, n = 0;
        for (t.reverse(); n < t.length; n += 2) e = t[n], t[n] = t[n + 1], t[n + 1] = e;
        t.reversed = !t.reversed
    }
    var A = {
        rect: "rx,ry,x,y,width,height",
        circle: "r,cx,cy",
        ellipse: "rx,ry,cx,cy",
        line: "x1,x2,y1,y2"
    };

    function convertToPath(t, e) {
        var n, r, o, i, a, h, s, l, g, c, p, f, u, d, _, m, w, v, P, y, x, T, M = t.tagName.toLowerCase(),
            O = .552284749831;
        return "path" !== M && t.getBBox ? (h = function _createPath(t, e) {
            var n, r = document.createElementNS("http://www.w3.org/2000/svg", "path"),
                o = [].slice.call(t.attributes),
                i = o.length;
            for (e = "," + e + ","; - 1 < --i;) n = o[i].nodeName.toLowerCase(), e.indexOf("," + n + ",") < 0 && r.setAttributeNS(null, n, o[i].nodeValue);
            return r
        }(t, "x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"), T = function _attrToObj(t, e) {
            for (var n = e ? e.split(",") : [], r = {}, o = n.length; - 1 < --o;) r[n[o]] = +t.getAttribute(n[o]) || 0;
            return r
        }(t, A[M]), "rect" === M ? (i = T.rx, a = T.ry, r = T.x, o = T.y, c = T.width - 2 * i, p = T.height - 2 * a, n = i || a ? "M" + (m = (d = (u = r + i) + c) + i) + "," + (v = o + a) + " V" + (P = v + p) + " C" + [m, y = P + a * O, _ = d + i * O, x = P + a, d, x, d - (d - u) / 3, x, u + (d - u) / 3, x, u, x, f = r + i * (1 - O), x, r, y, r, P, r, P - (P - v) / 3, r, v + (P - v) / 3, r, v, r, w = o + a * (1 - O), f, o, u, o, u + (d - u) / 3, o, d - (d - u) / 3, o, d, o, _, o, m, w, m, v].join(",") + "z" : "M" + (r + c) + "," + o + " v" + p + " h" + -c + " v" + -p + " h" + c + "z") : "circle" === M || "ellipse" === M ? (l = "circle" === M ? (i = a = T.r) * O : (i = T.rx, (a = T.ry) * O), n = "M" + ((r = T.cx) + i) + "," + (o = T.cy) + " C" + [r + i, o + l, r + (s = i * O), o + a, r, o + a, r - s, o + a, r - i, o + l, r - i, o, r - i, o - l, r - s, o - a, r, o - a, r + s, o - a, r + i, o - l, r + i, o].join(",") + "z") : "line" === M ? n = "M" + T.x1 + "," + T.y1 + " L" + T.x2 + "," + T.y2 : "polyline" !== M && "polygon" !== M || (n = "M" + (r = (g = (t.getAttribute("points") + "").match(b) || []).shift()) + "," + (o = g.shift()) + " L" + g.join(","), "polygon" === M && (n += "," + r + "," + o + "z")), h.setAttribute("d", rawPathToString(h._gsRawPath = stringToRawPath(n))), e && t.parentNode && (t.parentNode.insertBefore(h, t), t.parentNode.removeChild(t)), h) : t
    }

    function arcToSegment(t, e, n, r, o, i, a, h, s) {
        if (t !== h || e !== s) {
            n = Q(n), r = Q(r);
            var l = o % 360 * D,
                g = k(l),
                c = E(l),
                p = Math.PI,
                f = 2 * p,
                u = (t - h) / 2,
                d = (e - s) / 2,
                _ = g * u + c * d,
                m = -c * u + g * d,
                w = _ * _,
                v = m * m,
                P = w / (n * n) + v / (r * r);
            1 < P && (n = J(P) * n, r = J(P) * r);
            var y = n * n,
                x = r * r,
                T = (y * x - y * v - x * w) / (y * v + x * w);
            T < 0 && (T = 0);
            var M = (i === a ? -1 : 1) * J(T),
                O = n * m / r * M,
                S = -r * _ / n * M,
                b = g * O - c * S + (t + h) / 2,
                N = c * O + g * S + (e + s) / 2,
                R = (_ - O) / n,
                A = (m - S) / r,
                z = (-_ - O) / n,
                L = (-m - S) / r,
                C = R * R + A * A,
                V = (A < 0 ? -1 : 1) * Math.acos(R / J(C)),
                F = (R * L - A * z < 0 ? -1 : 1) * Math.acos((R * z + A * L) / J(C * (z * z + L * L)));
            isNaN(F) && (F = p), !a && 0 < F ? F -= f : a && F < 0 && (F += f), V %= f, F %= f;
            var X, Y = Math.ceil(Q(F) / (f / 4)),
                I = [],
                j = F / Y,
                G = 4 / 3 * E(j / 2) / (1 + k(j / 2)),
                U = g * n,
                q = c * n,
                H = c * -r,
                B = g * r;
            for (X = 0; X < Y; X++) _ = k(o = V + X * j), m = E(o), R = k(o += j), A = E(o), I.push(_ - G * m, m + G * _, R + G * A, A - G * R, R, A);
            for (X = 0; X < I.length; X += 2) _ = I[X], m = I[X + 1], I[X] = _ * U + m * H + b, I[X + 1] = _ * q + m * B + N;
            return I[X - 2] = h, I[X - 1] = s, I
        }
    }

    function stringToRawPath(t) {
        function xc(t, e, n, r) {
            g = (n - t) / 3, c = (r - e) / 3, h.push(t + g, e + c, n - g, r - c, n, r)
        }
        var e, n, r, o, i, a, h, s, l, g, c, p, f, u, d, _ = (t + "").replace(N, function (t) {
            var e = +t;
            return e < 1e-4 && -1e-4 < e ? 0 : e
        }).match(M) || [],
            m = [],
            w = 0,
            v = 0,
            P = _.length,
            y = 0,
            x = "ERROR: malformed path: " + t;
        if (!t || !isNaN(_[0]) || isNaN(_[1])) return console.log(x), m;
        for (e = 0; e < P; e++)
            if (f = i, isNaN(_[e]) ? a = (i = _[e].toUpperCase()) !== _[e] : e--, r = +_[e + 1], o = +_[e + 2], a && (r += w, o += v), e || (s = r, l = o), "M" === i) h && (h.length < 8 ? --m.length : y += h.length), w = s = r, v = l = o, h = [r, o], m.push(h), e += 2, i = "L";
            else if ("C" === i) a || (w = v = 0), (h = h || [0, 0]).push(r, o, w + 1 * _[e + 3], v + 1 * _[e + 4], w += 1 * _[e + 5], v += 1 * _[e + 6]), e += 6;
            else if ("S" === i) g = w, c = v, "C" !== f && "S" !== f || (g += w - h[h.length - 4], c += v - h[h.length - 3]), a || (w = v = 0), h.push(g, c, r, o, w += 1 * _[e + 3], v += 1 * _[e + 4]), e += 4;
            else if ("Q" === i) g = w + 2 / 3 * (r - w), c = v + 2 / 3 * (o - v), a || (w = v = 0), w += 1 * _[e + 3], v += 1 * _[e + 4], h.push(g, c, w + 2 / 3 * (r - w), v + 2 / 3 * (o - v), w, v), e += 4;
            else if ("T" === i) g = w - h[h.length - 4], c = v - h[h.length - 3], h.push(w + g, v + c, r + 2 / 3 * (w + 1.5 * g - r), o + 2 / 3 * (v + 1.5 * c - o), w = r, v = o), e += 2;
            else if ("H" === i) xc(w, v, w = r, v), e += 1;
            else if ("V" === i) xc(w, v, w, v = r + (a ? v - w : 0)), e += 1;
            else if ("L" === i || "Z" === i) "Z" === i && (r = s, o = l, h.closed = !0), ("L" === i || .5 < Q(w - r) || .5 < Q(v - o)) && (xc(w, v, r, o), "L" === i && (e += 2)), w = r, v = o;
            else if ("A" === i) {
                if (u = _[e + 4], d = _[e + 5], g = _[e + 6], c = _[e + 7], n = 7, 1 < u.length && (u.length < 3 ? (c = g, g = d, n--) : (c = d, g = u.substr(2), n -= 2), d = u.charAt(1), u = u.charAt(0)), p = arcToSegment(w, v, +_[e + 1], +_[e + 2], +_[e + 3], +u, +d, (a ? w : 0) + 1 * g, (a ? v : 0) + 1 * c), e += n, p)
                    for (n = 0; n < p.length; n++) h.push(p[n]);
                w = h[h.length - 2], v = h[h.length - 1]
            } else console.log(x);
        return (e = h.length) < 6 ? (m.pop(), e = 0) : h[0] === h[e - 2] && h[1] === h[e - 1] && (h.closed = !0), m.totalPoints = y + e, m
    }

    function rawPathToString(t) {
        h(t[0]) && (t = [t]);
        var e, n, r, o, i = "",
            a = t.length;
        for (n = 0; n < a; n++) {
            for (o = t[n], i += "M" + s(o[0]) + "," + s(o[1]) + " C", e = o.length, r = 2; r < e; r++) i += s(o[r++]) + "," + s(o[r++]) + " " + s(o[r++]) + "," + s(o[r++]) + " " + s(o[r++]) + "," + s(o[r]) + " ";
            o.closed && (i += "z")
        }
        return i
    }

    function y() {
        return n || "undefined" != typeof window && (n = window.gsap) && n.registerPlugin && n
    }

    function L(t) {
        return console && console.warn(t)
    }

    function O() {
        return String.fromCharCode.apply(null, arguments)
    }

    function R(t) {
        var e, n = t.length,
            r = 0,
            o = 0;
        for (e = 0; e < n; e++) r += t[e++], o += t[e];
        return [r / (n / 2), o / (n / 2)]
    }

    function S(t) {
        var e, n, r, o = t.length,
            i = t[0],
            a = i,
            h = t[1],
            s = h;
        for (r = 6; r < o; r += 6) i < (e = t[r]) ? i = e : e < a && (a = e), h < (n = t[r + 1]) ? h = n : n < s && (s = n);
        return t.centerX = (i + a) / 2, t.centerY = (h + s) / 2, t.size = (i - a) * (h - s)
    }

    function T(t, e) {
        void 0 === e && (e = 3);
        for (var n, r, o, i, a, h, s, l, g, c, p, f, u, d, _, m, w = t.length, v = t[0][0], P = v, y = t[0][1], x = y, T = 1 / e; - 1 < --w;)
            for (n = (a = t[w]).length, i = 6; i < n; i += 6)
                for (g = a[i], c = a[i + 1], p = a[i + 2] - g, d = a[i + 3] - c, f = a[i + 4] - g, _ = a[i + 5] - c, u = a[i + 6] - g, m = a[i + 7] - c, h = e; - 1 < --h;) v < (r = ((s = T * h) * s * u + 3 * (l = 1 - s) * (s * f + l * p)) * s + g) ? v = r : r < P && (P = r), y < (o = (s * s * m + 3 * l * (s * _ + l * d)) * s + c) ? y = o : o < x && (x = o);
        return t.centerX = (v + P) / 2, t.centerY = (y + x) / 2, t.left = P, t.width = v - P, t.top = x, t.height = y - x, t.size = (v - P) * (y - x)
    }

    function U(t, e) {
        return e.length - t.length
    }

    function V(t, e) {
        var n = t.size || S(t),
            r = e.size || S(e);
        return Math.abs(r - n) < (n + r) / 20 ? e.centerX - t.centerX || e.centerY - t.centerY : r - n
    }

    function W(t, e) {
        var n, r, o = t.slice(0),
            i = t.length,
            a = i - 2;
        for (e |= 0, n = 0; n < i; n++) r = (n + e) % a, t[n++] = o[r], t[n] = o[1 + r]
    }

    function X(t, e, n, r, o) {
        var i, a, h, s, l = t.length,
            g = 0,
            c = l - 2;
        for (n *= 6, a = 0; a < l; a += 6) s = t[i = (a + n) % c] - (e[a] - r), h = t[1 + i] - (e[a + 1] - o), g += w(h * h + s * s);
        return g
    }

    function Y(t, e, n) {
        var r, o, i, a = t.length,
            h = R(t),
            s = R(e),
            l = s[0] - h[0],
            g = s[1] - h[1],
            c = X(t, e, 0, l, g),
            p = 0;
        for (i = 6; i < a; i += 6)(o = X(t, e, i / 6, l, g)) < c && (c = o, p = i);
        if (n)
            for (reverseSegment(r = t.slice(0)), i = 6; i < a; i += 6)(o = X(r, e, i / 6, l, g)) < c && (c = o, p = -i);
        return p / 6
    }

    function Z(t, e, n) {
        for (var r, o, i, a, h, s, l = t.length, g = 1e20, c = 0, p = 0; - 1 < --l;)
            for (s = (r = t[l]).length, h = 0; h < s; h += 6) o = r[h] - e, i = r[h + 1] - n, (a = w(o * o + i * i)) < g && (g = a, c = r[h], p = r[h + 1]);
        return [c, p]
    }

    function $(t, e, n, r, o, i) {
        var a, h, s, l, g = e.length,
            c = 0,
            p = Math.min(t.size || S(t), e[n].size || S(e[n])) * r,
            f = 1e20,
            u = t.centerX + o,
            d = t.centerY + i;
        for (a = n; a < g && !((e[a].size || S(e[a])) < p); a++) h = e[a].centerX - u, s = e[a].centerY - d, (l = w(h * h + s * s)) < f && (c = a, f = l);
        return l = e[c], e.splice(c, 1), l
    }

    function _(t, e) {
        var n, r, o, i, a, h, s, l, g, c, p, f, u, d, _ = 0,
            m = t.length,
            w = e / ((m - 2) / 6);
        for (u = 2; u < m; u += 6)
            for (_ += w; .999999 < _;) n = t[u - 2], r = t[u - 1], o = t[u], i = t[u + 1], a = t[u + 2], h = t[u + 3], s = t[u + 4], l = t[u + 5], g = n + (o - n) * (d = 1 / ((Math.floor(_) || 1) + 1)), g += ((p = o + (a - o) * d) - g) * d, p += (a + (s - a) * d - p) * d, c = r + (i - r) * d, c += ((f = i + (h - i) * d) - c) * d, f += (h + (l - h) * d - f) * d, t.splice(u, 4, n + (o - n) * d, r + (i - r) * d, g, c, g + (p - g) * d, c + (f - c) * d, p, f, a + (s - a) * d, h + (l - h) * d), u += 6, m += 6, _--;
        return t
    }

    function aa(t, e, n, r, o) {
        var i, a, h, s, l, g, c, p = e.length - t.length,
            f = 0 < p ? e : t,
            u = 0 < p ? t : e,
            d = 0,
            m = "complexity" === r ? U : V,
            w = "position" === r ? 0 : "number" == typeof r ? r : .8,
            v = u.length,
            P = "object" == typeof n && n.push ? n.slice(0) : [n],
            y = "reverse" === P[0] || P[0] < 0,
            x = "log" === n;
        if (u[0]) {
            if (1 < f.length && (t.sort(m), e.sort(m), f.size || T(f), u.size || T(u), g = f.centerX - u.centerX, c = f.centerY - u.centerY, m === V))
                for (v = 0; v < u.length; v++) f.splice(v, 0, $(u[v], f, v, w, g, c));
            if (p)
                for (p < 0 && (p = -p), f[0].length > u[0].length && _(u[0], (f[0].length - u[0].length) / 6 | 0), v = u.length; d < p;) f[v].size || S(f[v]), s = (h = Z(u, f[v].centerX, f[v].centerY))[0], l = h[1], u[v++] = [s, l, s, l, s, l, s, l], u.totalPoints += 8, d++;
            for (v = 0; v < t.length; v++) i = e[v], a = t[v], (p = i.length - a.length) < 0 ? _(i, -p / 6 | 0) : 0 < p && _(a, p / 6 | 0), y && !1 !== o && !a.reversed && reverseSegment(a), (n = P[v] || 0 === P[v] ? P[v] : "auto") && (a.closed || Math.abs(a[0] - a[a.length - 2]) < .5 && Math.abs(a[1] - a[a.length - 1]) < .5 ? "auto" === n || "log" === n ? (P[v] = n = Y(a, i, !v || !1 === o), n < 0 && (y = !0, reverseSegment(a), n = -n), W(a, 6 * n)) : "reverse" !== n && (v && n < 0 && reverseSegment(a), W(a, 6 * (n < 0 ? -n : n))) : !y && ("auto" === n && Math.abs(i[0] - a[0]) + Math.abs(i[1] - a[1]) + Math.abs(i[i.length - 2] - a[a.length - 2]) + Math.abs(i[i.length - 1] - a[a.length - 1]) > Math.abs(i[0] - a[a.length - 2]) + Math.abs(i[1] - a[a.length - 1]) + Math.abs(i[i.length - 2] - a[0]) + Math.abs(i[i.length - 1] - a[1]) || n % 2) ? (reverseSegment(a), P[v] = -1, y = !0) : "auto" === n ? P[v] = 0 : "reverse" === n && (P[v] = -1), a.closed !== i.closed && (a.closed = i.closed = !1));
            return x && L("shapeIndex:[" + P.join(",") + "]"), t.shapeIndex = P
        }
    }

    function da(t, e) {
        var n, r, o, i, a, h, s, l = 0,
            g = parseFloat(t[0]),
            c = parseFloat(t[1]),
            p = g + "," + c + " ";
        for (n = .5 * e / (.5 * (o = t.length) - 1), r = 0; r < o - 2; r += 2) {
            if (l += n, h = parseFloat(t[r + 2]), s = parseFloat(t[r + 3]), .999999 < l)
                for (a = 1 / (Math.floor(l) + 1), i = 1; .999999 < l;) p += (g + (h - g) * a * i).toFixed(2) + "," + (c + (s - c) * a * i).toFixed(2) + " ", l--, i++;
            p += h + "," + s + " ", g = h, c = s
        }
        return p
    }

    function ea(t) {
        var e = t[0].match(j) || [],
            n = t[1].match(j) || [],
            r = n.length - e.length;
        0 < r ? t[0] = da(e, r) : t[1] = da(n, -r)
    }

    function fa(e) {
        return isNaN(e) ? ea : function (t) {
            ea(t), t[1] = function _offsetPoints(t, e) {
                if (!e) return t;
                var n, r, o, i = t.match(j) || [],
                    a = i.length,
                    h = "";
                for (n = "reverse" === e ? (r = a - 1, -2) : (r = (2 * (parseInt(e, 10) || 0) + 1 + 100 * a) % a, 2), o = 0; o < a; o += 2) h += i[r - 1] + "," + i[r] + " ", r = (r + n) % a;
                return h
            }(t[1], parseInt(e, 10))
        }
    }

    function ha(t, e) {
        for (var n, r, o, i, a, h, s, l, g, c, p, f, u = t.length, d = .2 * (e || 1); - 1 < --u;) {
            for (p = (r = t[u]).isSmooth = r.isSmooth || [0, 0, 0, 0], f = r.smoothData = r.smoothData || [0, 0, 0, 0], p.length = 4, l = r.length - 2, s = 6; s < l; s += 6) o = r[s] - r[s - 2], i = r[s + 1] - r[s - 1], a = r[s + 2] - r[s], h = r[s + 3] - r[s + 1], g = P(i, o), c = P(h, a), (n = Math.abs(g - c) < d) && (f[s - 2] = g, f[s + 2] = c, f[s - 1] = w(o * o + i * i), f[s + 3] = w(a * a + h * h)), p.push(n, n, 0, 0, n, n);
            r[l] === r[0] && r[1 + l] === r[1] && (o = r[0] - r[l - 2], i = r[1] - r[l - 1], a = r[2] - r[0], h = r[3] - r[1], g = P(i, o), c = P(h, a), Math.abs(g - c) < d && (f[l - 2] = g, f[2] = c, f[l - 1] = w(o * o + i * i), f[3] = w(a * a + h * h), p[l - 2] = p[l - 1] = !0))
        }
        return t
    }

    function ia(t) {
        var e = t.trim().split(" ");
        return {
            x: (~t.indexOf("left") ? 0 : ~t.indexOf("right") ? 100 : isNaN(parseFloat(e[0])) ? 50 : parseFloat(e[0])) / 100,
            y: (~t.indexOf("top") ? 0 : ~t.indexOf("bottom") ? 100 : isNaN(parseFloat(e[1])) ? 50 : parseFloat(e[1])) / 100
        }
    }

    function la(t, e, n, r) {
        var o, i, a = this._origin,
            h = this._eOrigin,
            s = t[n] - a.x,
            l = t[n + 1] - a.y,
            g = w(s * s + l * l),
            c = P(l, s);
        return s = e[n] - h.x, l = e[n + 1] - h.y, i = function _shortAngle(t) {
            return t !== t % p ? t + (t < 0 ? f : -f) : t
        }(o = P(l, s) - c), !r && F && Math.abs(i + F.ca) < u && (r = F), this._anchorPT = F = {
            _next: this._anchorPT,
            t: t,
            sa: c,
            ca: r && i * r.ca < 0 && Math.abs(i) > d ? o : i,
            sl: g,
            cl: w(s * s + l * l) - g,
            i: n
        }
    }

    function ma(t) {
        n = y(), o = o || n && n.plugins.morphSVG, n && o ? (C = n.utils.toArray, o.prototype._tweenRotation = la, I = 1) : t && L("Please gsap.registerPlugin(MorphSVGPlugin)")
    }
    var n, C, F, I, o, P = Math.atan2,
        x = Math.cos,
        z = Math.sin,
        w = Math.sqrt,
        p = Math.PI,
        f = 2 * p,
        u = .3 * p,
        d = .7 * p,
        j = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,
        G = /(^[#\.][a-z]|[a-y][a-z])/gi,
        q = /[achlmqstvz]/gi,
        i = "MorphSVGPlugin",
        a = O(103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109),
        H = function (t) {
        },
        B = "Use MorphSVGPlugin.convertToPath() to convert to a path before morphing.",
        K = {
            version: "3.3.0",
            name: "morphSVG",
            register: function register(t, e) {
                n = t, o = e, ma()
            },
            init: function init(t, e, n, r, o) {
                var i, a, h, s, l, g, c, p, f, u, d, _, m, w, v, P, y, x, M, O, S, b, N = t.nodeType ? window.getComputedStyle(t) : {},
                    R = N.fill + "",
                    A = !("none" === R || "0" === (R.match(j) || [])[3] || "evenodd" === N.fillRule),
                    z = (e.origin || "50 50").split(",");
                if (I || ma(1), l = "POLYLINE" === (i = (t.nodeName + "").toUpperCase()) || "POLYGON" === i, "PATH" !== i && !l && !e.prop) return L("Cannot morph a <" + i + "> element. " + B), !1;
                if (a = "PATH" === i ? "d" : "points", ("string" == typeof e || e.getBBox || e[0]) && (e = {
                    shape: e
                }), !e.prop && "function" != typeof t.setAttribute) return !1;
                if (s = function _parseShape(t, e, n) {
                    var r, o;
                    return (!("string" == typeof t) || G.test(t) || (t.match(j) || []).length < 3) && ((r = C(t)[0]) ? (o = (r.nodeName + "").toUpperCase(), e && "PATH" !== o && (r = convertToPath(r, !1), o = "PATH"), t = r.getAttribute("PATH" === o ? "d" : "points") || "", r === n && (t = r.getAttributeNS(null, "data-original") || t)) : (L("WARNING: invalid morph to: " + t), t = !1)), t
                }(e.shape || e.d || e.points || "", "d" == a, t), l && q.test(s)) return L("A <" + i + "> cannot accept path data. " + B), !1;
                if (g = e.shapeIndex || 0 === e.shapeIndex ? e.shapeIndex : "auto", c = e.map || K.defaultMap, this._prop = e.prop, this._render = e.render || K.defaultRender, this._apply = "updateTarget" in e ? e.updateTarget : K.defaultUpdateTarget, this._rnd = Math.pow(10, isNaN(e.precision) ? 2 : +e.precision), this._tween = n, s) {
                    if (this._target = t, y = "object" == typeof e.precompile, u = this._prop ? t[this._prop] : t.getAttribute(a), this._prop || t.getAttributeNS(null, "data-original") || t.setAttributeNS(null, "data-original", u), "d" == a || this._prop) {
                        if (u = stringToRawPath(y ? e.precompile[0] : u), d = stringToRawPath(y ? e.precompile[1] : s), !y && !aa(u, d, g, c, A)) return !1;
                        for ("log" !== e.precompile && !0 !== e.precompile || L('precompile:["' + rawPathToString(u) + '","' + rawPathToString(d) + '"]'), (S = "linear" !== (e.type || K.defaultType)) && (u = ha(u, e.smoothTolerance), d = ha(d, e.smoothTolerance), u.size || T(u), d.size || T(d), O = ia(z[0]), this._origin = u.origin = {
                            x: u.left + O.x * u.width,
                            y: u.top + O.y * u.height
                        }, z[1] && (O = ia(z[1])), this._eOrigin = {
                            x: d.left + O.x * d.width,
                            y: d.top + O.y * d.height
                        }), this._rawPath = t._gsRawPath = u, m = u.length; - 1 < --m;)
                            for (v = u[m], P = d[m], p = v.isSmooth || [], f = P.isSmooth || [], w = v.length, _ = F = 0; _ < w; _ += 2) P[_] === v[_] && P[_ + 1] === v[_ + 1] || (S ? p[_] && f[_] ? (x = v.smoothData, M = P.smoothData, b = _ + (_ === w - 4 ? 7 - w : 5), this._controlPT = {
                                _next: this._controlPT,
                                i: _,
                                j: m,
                                l1s: x[_ + 1],
                                l1c: M[_ + 1] - x[_ + 1],
                                l2s: x[b],
                                l2c: M[b] - x[b]
                            }, h = this._tweenRotation(v, P, _ + 2), this._tweenRotation(v, P, _, h), this._tweenRotation(v, P, b - 1, h), _ += 4) : this._tweenRotation(v, P, _) : (h = this.add(v, _, v[_], P[_]), h = this.add(v, _ + 1, v[_ + 1], P[_ + 1]) || h))
                    } else h = this.add(t, "setAttribute", t.getAttribute(a) + "", s + "", r, o, 0, fa(g), a);
                    S && (this.add(this._origin, "x", this._origin.x, this._eOrigin.x), h = this.add(this._origin, "y", this._origin.y, this._eOrigin.y)), h && (this._props.push("morphSVG"), h.end = s, h.endProp = a)
                }
                return H
            },
            render: function render(t, e) {
                for (var n, r, o, i, a, h, s, l, g, c, p, f, u = e._rawPath, d = e._controlPT, _ = e._anchorPT, m = e._rnd, w = e._target, v = e._pt; v;) v.r(t, v.d), v = v._next;
                if (1 === t && e._apply)
                    for (v = e._pt; v;) v.end && (e._prop ? w[e._prop] = v.end : w.setAttribute(v.endProp, v.end)), v = v._next;
                else if (u) {
                    for (; _;) a = _.sa + t * _.ca, i = _.sl + t * _.cl, _.t[_.i] = e._origin.x + x(a) * i, _.t[_.i + 1] = e._origin.y + z(a) * i, _ = _._next;
                    for (r = t < .5 ? 2 * t * t : (4 - 2 * t) * t - 1; d;) f = (h = d.i) + (h === (o = u[d.j]).length - 4 ? 7 - o.length : 5), a = P(o[f] - o[h + 1], o[f - 1] - o[h]), c = z(a), p = x(a), l = o[h + 2], g = o[h + 3], i = d.l1s + r * d.l1c, o[h] = l - p * i, o[h + 1] = g - c * i, i = d.l2s + r * d.l2c, o[f - 1] = l + p * i, o[f] = g + c * i, d = d._next;
                    if (w._gsRawPath = u, e._apply) {
                        for (n = "", s = 0; s < u.length; s++)
                            for (i = (o = u[s]).length, n += "M" + (o[0] * m | 0) / m + " " + (o[1] * m | 0) / m + " C", h = 2; h < i; h++) n += (o[h] * m | 0) / m + " ";
                        e._prop ? w[e._prop] = n : w.setAttribute("d", n)
                    }
                }
                e._render && u && e._render.call(e._tween, u, w)
            },
            kill: function kill() {
                this._pt = this._rawPath = 0
            },
            getRawPath: function getRawPath(t) {
                var e, n = (t = m(t) && r.test(t) && document.querySelector(t) || t).getAttribute ? t : 0;
                return n && (t = t.getAttribute("d")) ? (n._gsPath || (n._gsPath = {}), (e = n._gsPath[t]) && !e._dirty ? e : n._gsPath[t] = stringToRawPath(t)) : t ? m(t) ? stringToRawPath(t) : h(t[0]) ? [t] : t : console.warn("Expecting a <path> element or an SVG path data string")
            },
            stringToRawPath: stringToRawPath,
            rawPathToString: rawPathToString,
            pathFilter: function _pathFilter(t, e, n, r, o) {
                var i = stringToRawPath(t[0]),
                    a = stringToRawPath(t[1]);
                aa(i, a, e || 0 === e ? e : "auto", n, o) && (t[0] = rawPathToString(i), t[1] = rawPathToString(a), "log" !== r && !0 !== r || L('precompile:["' + t[0] + '","' + t[1] + '"]'))
            },
            pointsFilter: ea,
            getTotalSize: T,
            equalizeSegmentQuantity: aa,
            convertToPath: function convertToPath$1(t, e) {
                return C(t).map(function (t) {
                    return convertToPath(t, !1 !== e)
                })
            },
            defaultType: "linear",
            defaultUpdateTarget: !0,
            defaultMap: "size"
        };
    y() && n.registerPlugin(K), t.MorphSVGPlugin = K, t.default = K;
    if (typeof (window) === "undefined" || window !== t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    } else {
        delete t.default
    }
});