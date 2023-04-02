import * as d3 from 'd3'

export class ZoomAbleScatterPlotWithQuadrant {
  lib = { d3 }
  spec = {
    viewport: {
      width: 840,
      height: 840,
    },
    margin: {
      top: 12,
      bottom: 12,
      left: 12,
      right: 12,
    },
    zoom: {
      scaleExtent: [1, 8],
      translateExtent: [
        [0, 0],
        [840, 840],
      ],
    },
    axis: {
      tick: 10,
    },
    dots: {
      r: 12,
      opacity: 0.5,
      data: Array.from({ length: 0 }).map((_, i) => ({
        i: 0,
        n: 'json[i].item_name',
        x: 0,
        y: 0,
        t: 0,
        img: 'json[i].main_item_img',
      })),
    },
  }
  constructor(spec) {
    this.spec = spec
  }
  init() {
    this.create().addEvent().update()

    return this
  }
  zoomReset() {
    this.svg.transition().call(zoom)
    return this
  }
  zoomTo(id) {
    const { d3 } = this.lib
    const { width, height } = this.spec.viewport

    const selected = d3.select(`._dot_${id}`).attr('fill', 'red').attr('opacity', 1)
    const cw = width / 2
    const ch = height / 2
    const ccw = cw / 2
    const cch = ch / 2
    const cx = +selected.attr('cx')
    const cy = +selected.attr('cy')
    const leftOver = cx < ccw
    const rightOver = cx >= width - ccw
    const topOver = cy < cch
    const bottomOver = cy >= height - cch
    const x = leftOver ? ccw : rightOver ? width - ccw : cx
    const y = topOver ? cch : bottomOver ? height - cch : cy

    const zoomToIdentity = d3.zoomIdentity.translate(cw, ch).scale(2).translate(-x, -y)

    this.svg.transition().call(this.zoom.transform, zoomToIdentity)

    return this
  }
  quadrantTo(id) {
    const { d3 } = this.lib
    const { width, height } = this.spec.viewport

    const selected = d3.select(`._dot_${id}`)
    const cx = +selected.attr('cx')
    const cy = +selected.attr('cy')
    const x = (cx / width) * 100
    const y = (cy / height) * 100

    const data = [
      {
        x: '0%',
        y: '0%',
        width: x + '%',
        height: y + '%',
        fill: 'url(#quadrant_1)',
        id: 'quadrant_1',
        color: '#ef476f',
        gradientTransform: 'translate(-1,-1) scale(2,2)',
      },
      {
        x: x + '%',
        y: '0%',
        width: 100 - x + '%',
        height: y + '%',
        fill: 'url(#quadrant_2)',
        id: 'quadrant_2',
        color: '#06d6a0',
        gradientTransform: 'translate(0,-1) scale(2,2)',
      },
      {
        x: x + '%',
        y: y + '%',
        width: 100 - x + '%',
        height: 100 - y + '%',
        fill: 'url(#quadrant_3)',
        id: 'quadrant_1',
        color: '#26547c',
        gradientTransform: 'translate(0,0) scale(2,2)',
      },
      {
        x: '0%',
        y: y + '%',
        width: x + '%',
        height: 100 - y + '%',
        fill: 'url(#quadrant_4)',
        id: 'quadrant_4',
        color: '#ffd166',
        gradientTransform: 'translate(-1,0) scale(2,2)',
      },
    ]
    this.defs = this.svg
      .append('defs')
      .selectAll('radialGradient')
      .data(data)
      .enter()
      .append('radialGradient')
      .attr('id', (_, i) => `quadrant_${++i}`)
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '100%')
      .attr('gradientTransform', (d) => d.gradientTransform)
      .each(function (d, i) {
        const stopsData = [
          { offset: '0%', opacity: 0.3 },
          { offset: '50%', opacity: 0.2 },
          { offset: '100%', opacity: 0.1 },
        ]
        d3.select(this)
          .selectAll('stop')
          .data(stopsData)
          .enter()
          .append('stop')
          .attr('offset', (d) => d.offset)
          .attr('stop-color', d.color)
          .attr('stop-opacity', (d) => d.opacity)
      })

    this.quadrant = this.gq
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', (_, i) => `_quadrant${++i}`)
      .attr('x', (d) => d.x)
      .attr('y', (d) => d.y)
      .attr('width', (d) => d.width)
      .attr('height', (d) => d.height)
      .attr('fill', (d) => d.fill)

    return this
  }
  create() {
    const { d3 } = this.lib
    const { viewport, margin, zoom, axis, dots } = this.spec
    const { scaleExtent, translateExtent } = zoom
    const { width, height } = viewport
    const { left, bottom } = margin
    const { tick } = axis

    // dom
    this.body = d3.select('body')
    this.target = d3.select('#target')
    this.target.html('')
    this.svg = this.target.append('svg')
    this.tt = this.target.append('div').attr('class', '_tt')
    this.gx = this.svg.append('g').attr('class', '_g_x')
    this.gy = this.svg.append('g').attr('class', '_g_y')
    this.gq = this.svg.append('g').attr('class', '_g_q')
    this.gd = this.svg.append('g').attr('class', '_g_d')
    this.dots = this.gd
      .selectAll('circle')
      .data(dots.data)
      .enter()
      .append('circle')
      .attr('class', (d) => `_dot_${d.i}`)

    this.dotTexts = this.gd
      .selectAll('text')
      .data(dots.data)
      .enter()
      .append('text')
      .attr('class', (d) => `_dot_text_${d.i}`)

    // object
    this.zoom = d3.zoom().scaleExtent(scaleExtent).translateExtent(translateExtent)

    this.xScale = d3
      .scaleLinear()
      .domain([d3.min(dots.data, (d) => d.x), d3.max(dots.data, (d) => d.x)])
      .range([0, width])

    this.yScale = d3
      .scaleLinear()
      .domain([d3.min(dots.data, (d) => d.y), d3.max(dots.data, (d) => d.y)])
      .range([0, height])

    this.xAxis = d3
      .axisBottom(this.xScale)
      .ticks(tick)
      .tickSize(height)
      .tickPadding(bottom - height)

    this.yAxis = d3
      .axisRight(this.yScale)
      .ticks(tick)
      .tickSize(width)
      .tickPadding(left - width)

    return this
  }
  addEvent() {
    this.svg.on('dblclick.zoom', null)

    this.zoom.on('zoom', ({ transform }) => {
      this.gq.attr('transform', transform)
      this.gd.attr('transform', transform)
      this.gx.call(this.xAxis.scale(transform.rescaleX(this.xScale)))
      this.gy.call(this.yAxis.scale(transform.rescaleY(this.yScale)))
      this.svg.selectAll('g.tick line').attr('stroke', '#ccc')
    })

    this.dots
      .on('mouseover', (e) => {
        this.tt.style('display', 'block')
        e.target.setAttribute('fill', 'blue')
      })
      .on('mouseout', (e) => {
        this.tt.style('display', 'none')
        e.target.setAttribute('fill', 'black')
        e.target.setAttribute('opacity', 0.5)
      })
      .on('mousemove', (e, d) => {
        const x = e.layerX - 60
        const y = e.layerY + this.spec.dots.r * 4

        this.tt.style('left', `${x}px`)
        this.tt.style('top', `${y}px`)
        this.tt.html('')
        this.tt
          .append('img')
          .attr('src', d.img)
          .attr('alt', 'img of ' + d.n)
          .attr('loading', 'lazy')
          .style('display', 'block')
          .style('width', '100%')
          .style('text-align', 'center')
          .style('object-fit', 'cover')
        this.tt.append('strong').html(d.n)
        this.tt.append('p').html('id : ' + d.i)
        this.tt.append('div').html('cvr : ' + d.t)
      })
      .on('click', (_, d) => {
        this.zoomTo(d.i)
        const listTarget = document.getElementById(d.i)
        listTarget.scrollIntoView()
        listTarget.style.transition = 'all 1s ease'
        listTarget.style.backgroundColor = 'rgba(245, 40, 145, 0.8)'
        const m = setTimeout(() => {
          listTarget.style.backgroundColor = 'white'
          clearTimeout(m)
        }, 3000)
      })

    this.dotTexts.on('click', (_, d) => {
      this.zoomTo(d.i)
      const listTarget = document.getElementById(d.i)
      listTarget.scrollIntoView()
      listTarget.style.transition = 'all 1s ease'
      listTarget.style.backgroundColor = 'rgba(245, 40, 145, 0.8)'
      const m = setTimeout(() => {
        listTarget.style.backgroundColor = 'white'
        clearTimeout(m)
      }, 3000)
    })

    return this
  }
  update() {
    const { width, height } = this.spec.viewport
    const { data, r, opacity } = this.spec.dots

    this.tt.style('display', 'none')
    this.svg.attr('width', width).attr('height', height)
    this.dots
      .attr('cx', (d) => this.xScale(d.x))
      .attr('cy', (d) => this.yScale(d.y))
      .attr('r', r)
      .attr('opacity', opacity)

    this.dotTexts
      .attr('x', (d) => this.xScale(d.x))
      .attr('y', (d) => this.yScale(d.y) + r)
      .attr('font-size', r)
      .attr('dominant-baseline', 'middle')
      .attr('text-anchor', 'middle')
      .html((d) => d.i)

    this.gx.call(this.xAxis)
    this.gy.call(this.yAxis)
    this.svg.call(this.zoom)

    this.svg.selectAll('g.tick line').attr('stroke', '#ccc')

    return this
  }
}
