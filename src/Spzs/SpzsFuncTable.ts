import { IEntries } from '../ShaderPuzzleCompletion';

export var spzsFuncTable: IEntries = {
    transpose: {description: "calculate the transpose of a matrix",
    parameters: [{ label: 'm', documentation: "Specifies the matrix of which to take the transpose. " }],},
    
    sample: {description: "sample texels from a texture",
    parameters: [{ label: 'sampler', documentation: "Specifies the sampler to which the texture from which texels will be retrieved is bound." },
    { label: 'uv', documentation: "Specifies the texture coordinates at which texture will be sampled." }],},
    
    samplelod: {description: "perform a texture lookup with explicit level-of-detail",
    parameters: [{ label: 'sampler', documentation: "Specifies the sampler to which the texture from which texels will be retrieved is bound." },
    { label: 'p', documentation: "Specifies the texture coordinates at which texture will be sampled." },
    { label: 'lod', documentation: "Specifies the explicit level-of-detail." }],},
    
    transform: {description: "transform x with matrix m",
    parameters: [{ label: 'x', documentation: "The 3D vector." }, { label: 'm', documentation: "Specifies the matrix of which to take the trasform  . " }],},
    
    abs: {description: "Computes the absolute value of x.",
    parameters: [{ label: 'x', documentation: "The floating-point, 3D vector." }],},
    
    acos: {description: "Computes the arc cosine function of x.",
    parameters: [{ label: 'x', documentation: "The floating-point" }],},
    
    asin: {description: "Computes the arc sine function of x.",
    parameters: [{ label: 'x', documentation: "The floating-point" }],},
    
    atan: {description: "Computes the arc tangent function of y_over_x.",
    parameters: [{ label: 'x', documentation: "The floating-point" }, { label: 'y', documentation: "The floating-point" }],},
    
    ceil: {description: "Rounds x to an integral value using the round-to-positive-infinity rounding mode.",
    parameters: [{ label: 'x', documentation: "The floating-point" }],},
    
    cos: {description: "Computes the cosine of x.",
    parameters: [{ label: 'x', documentation: "The floating-point" }],},
    
    exp: {description: "Computes the base-e exponential of x",
    parameters: [{ label: 'x', documentation: "The floating-point" }],},
    
    exp2: {description: "Computes the base-2 exponential of x.",
    parameters: [{ label: 'x', documentation: "The floating-point" }],},
    
    floor: {description: "Rounds x to an integral value using the round-to-negative-infinity rounding mode.",
    parameters: [{ label: 'x', documentation: "The floating-point" }],},
    
    fractional: {description: "Returns the fractional part of x that is greater than or equal to 0 or less than 1.",
    parameters: [{ label: 'x', documentation: "The floating-point" }],},
    
    length: {description: "Returns the length of vector x; that is, sqrt(x[0]^2 + x[1]^2 + ...)",
    parameters: [{ label: 'x', documentation: "The 3D vector." }],},
    
    log: {description: "Computes the natural logarithm of x.",
    parameters: [{ label: 'x', documentation: "The floating-point" }],},
    
    log2: {description: "Computes the base-2 logarithm of x.",
    parameters: [{ label: 'x', documentation: "The floating-point" }],},
    
    negative: {description: " result = -x.",
    parameters: [{ label: 'x', documentation: "The floating-point" }],},
    
    normalize: {description: "Returns a vector in the same direction as x but with a length of 1.",
    parameters: [{ label: 'x', documentation: "The 3D vector." }],},
    
    oneminus: {description: "Computes 1 - x.",
    parameters: [{ label: 'x', documentation: "The floating-point" }],},
    
    rsqrt: {description: " Computes the inverse square root of x.",
    parameters: [{ label: 'x', documentation: "The floating-point" }],},
    
    saturate: {description: "Clamp x within the range of 0.0 to 1.0.",
    parameters: [{ label: 'x', documentation: "The floating-point" }],},
    
    sign: {description: "Returns 1.0 if x > 0, -0.0 if x = -0.0, +0.0 if x = +0.0, or -1.0 if x < 0. Returns 0.0 if x is a NaN.",
    parameters: [{ label: 'x', documentation: "The floating-point" }],},
    
    sin: {description: " Computes the sine of x.",
    parameters: [{ label: 'x', documentation: "The floating-point" }],},
    
    sqrt: {description: "Computes the square root of x.",
    parameters: [{ label: 'x', documentation: "The floating-point" }],},
    
    atan2: {description: "Computes arc tangent of y over x.",
    parameters: [{ label: 'x', documentation: "The floating-point" }],},
    
    dot: {description: "Returns the dot product of x and y; that is, x[0] * y[0] + x[1] * y[1] + ...",
    parameters: [{ label: 'x', documentation: "The 3D vector." }],},
    
    cross: {description: " Returns the cross product of x and y. T must be a 3-component vector type.",
    parameters: [{ label: 'x', documentation: "The 3D vector." }],},
    
    fmod: {description: "Returns x – y * trunc(x/y).",
    parameters: [{ label: 'x', documentation: "The floating-point" }, { label: 'y', documentation: "The floating-point" }],},
    
    min: {description: "Returns y if y < x; otherwise, it returns x.",
    parameters: [{ label: 'x', documentation: "The floating-point, 3D vector" }, { label: 'y', documentation: "The floating-point, 3D vector" }],},
    
    max: {description: "Returns y if x > y; otherwise, it returns x.",
    parameters: [{ label: 'x', documentation: "The floating-point, 3D vector" }, { label: 'y', documentation: "The floating-point, 3D vector" }],},
    
    pow: {description: "Computes x to the power y.",
    parameters: [{ label: 'x', documentation: "The floating-point" }, { label: 'y', documentation: "The floating-point" }],},
    
    reflect: {description: "For the incident vector I and the surface normal N, returns the reflection direction: I – 2 * dot(N, I) * N.In order to achieve the desired result, N must be normalized.",
    parameters: [{ label: 'I', documentation: "The 3D vector." }, { label: 'N', documentation: "The 3D vector." }],},
    
    step: {description: "Returns 0.0 if x < edge, otherwise it returns 1.0.",
    parameters: [{ label: 'x', documentation: "The floating-point, 3D vector." }, { label: 'edge', documentation: "The floating-point, 3D vector." }],},
    
    lerp: {description: "Returns the linear blend of x and y implemented as: x + (y – x ) * a. a must be a value in the range 0.0 … 1.0. If a is not in the range 0.0 … 1.0, the return values are undefined.",
    parameters: [{ label: 'x', documentation: "The floating-point, 3D vector." }, { label: 'y', documentation: "The floating-point, 3D vector." }, { label: 'a', documentation: "The floating-point, 3D vector." }],},
    
    clamp: {description: "Returns min(max(x, minval), maxval). Results are undefined if minval > maxval",
    parameters: [{ label: 'x', documentation: "The floating-point, 3D vector." }, { label: 'minval', documentation: "The floating-point, 3D vector." }, { label: 'maxval', documentation: "The floating-point, 3D vector." }],},
    
    refract: {description: "For the incident vector I, the surface normal N, and the ratio of indices of refraction eta,returns the refraction vector. The input parameters for the incident vector I and the surface normal N must already be normalized to get the desired results.",
    parameters: [{ label: 'I', documentation: "The 3D vector." }, { label: 'N', documentation: "The 3D vector." }, { label: 'eta', documentation: "The floating-point. ratio of indices of refraction." }],},
    
    smoothstep: {description: "Returns 0.0 if x <= edge0 and 1.0 if x >= edge1 and performs a smooth Hermite interpolation between 0 and 1 when edge0 < x &< edge1. This is useful in cases where you want a threshold function with a smooth transition. Results are undefined if edge0 >= edge1 or if x, edge0 or edge1 is a NaN. This is equivalent to: t = clamp((x – edge0)/(edge1 – edge0), 0, 1);",
    parameters: [{ label: 'edge0', documentation: "The floating-point, 3D vector." }, { label: 'edge1', documentation: "The floating-point, 3D vector." }, { label: 'x', documentation: "The floating-point, 3D vector." }],},
    
};