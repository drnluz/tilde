import Nearley from 'nearley'
import grammar from './grammar'

const parser = new Nearley.Parser(Nearley.Grammar.fromCompiled(grammar))

export default parser
