import {expect, test} from '@oclif/test'

describe('cms:t-make', () => {
  test
  .stdout()
  .command(['cms:t-make'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['cms:t-make', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
